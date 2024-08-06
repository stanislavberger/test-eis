import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { IRootModel } from '../models/RootStore';

const MeterItem = observer(({ meter, rootModel }: { meter: any, rootModel: IRootModel }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        rootModel.deleteMeter(meter.id);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative', padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}
        >
            <span>{meter.name}</span>
            {isHovered && (
                <button
                    onClick={handleDelete}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
});

export default MeterItem;