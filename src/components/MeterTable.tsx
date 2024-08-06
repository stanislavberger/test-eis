import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import icon_cold from "../assets/img/icon_counters_1.svg"
import icon_hot from "../assets/img/icon_counters_4.svg"
import icon_trash from "../assets/img/trash.svg"

const ITEMS_PER_PAGE = 20;
const PAGE_NUMBERS_TO_SHOW = 6; // Количество страниц для отображения

const MeterTable: React.FC = observer(() => {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    store.fetchMeters(currentPage);
    store.fetchAreas();
  }, [currentPage, store]);

  // Address from /test/areas
  const getHouseDetails = (areaId: string) => {
    const area = store.areas.find(area => area.id === areaId);
    return {
      address: area && area.house ? area.house.address : 'N/A',
      strNumberFull: area ? area.str_number_full : 'N/A'
    };
  };

  // combine data from stores
  const combinedData = store.meters.map((meter, index) => {
    const { address, strNumberFull } = getHouseDetails(meter.area.id);
    return {
      index: index + 1,
      type: meter._type.includes("ColdWaterAreaMeter") ? "ХВС" : "ГВС",
      installationDate: new Date(meter.installation_date),
      isAutomatic: meter.is_automatic ? "Да" : "Нет",
      initialValues: meter.initial_values.join(', '),
      address: `${address}, ${strNumberFull}`,
      description: meter.description
    };
  });

  // pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = combinedData.slice(startIndex, endIndex);

  // pages in pagination
  const totalPages = Math.ceil(store.totalMeters / ITEMS_PER_PAGE);

  // making numbers in pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const endPage = Math.min(startPage + PAGE_NUMBERS_TO_SHOW - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    store.fetchMeters(page);

    if (page === startPage + PAGE_NUMBERS_TO_SHOW - 1 && page < totalPages) {
      setStartPage(startPage + 1);
    }
  };

  return (
    <div className="content">
      <h2 className="table-title">Список счётчиков</h2>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th><h4>№</h4></th>
              <th><h4>Тип</h4></th>
              <th><h4>Дата установки</h4></th>
              <th><h4>Автоматический</h4></th>
              <th><h4>Текущие показания</h4></th>
              <th><h4>Адрес</h4></th>
              <th><h4>Примечания</h4></th>
              <th><h4>Действия</h4></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <tr key={index}>
                <td className="el_center">{startIndex + index + 1}</td>
                <td className="el_center">
                  <div className="_type">
                    <img src={data.type === "ГВС" ? icon_hot : icon_cold} alt="" />
                    <p>{data.type}</p>
                  </div>
                </td>
                <td className="el_center">{data.installationDate.toLocaleDateString()}</td>
                <td className="el_center">{data.isAutomatic}</td>
                <td className="el_center">{data.initialValues}</td>
                <td className="el_center">{data.address}</td>
                <td className="el_center">{data.description}</td>
                <td className="el_center">
                  <img src={icon_trash} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="el_end pagination">
          <div className="pagination_block">
          <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          &#10094;
        </button>
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {getPageNumbers().map(number => (
          <button 
            key={number} 
            onClick={() => handlePageChange(number)} 
            style={{ margin: '0 5px', fontWeight: number === currentPage ? 'bold' : 'normal' }}
          >
            {number}
          </button>
        ))}
        {startPage + PAGE_NUMBERS_TO_SHOW - 1 < totalPages && (
          <>
            {startPage + PAGE_NUMBERS_TO_SHOW - 1 < totalPages - 1 && <span>...</span>}
            <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
          </>
        )}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          &#10095;
        </button>
          </div>
      </div>
      </div>
    </div>
  );
});

export default MeterTable;