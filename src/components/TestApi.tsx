import { useEffect } from "react";
import testApi from "../api/test";

function TestApi () {
    
    useEffect(() => {
        testApi();
      }, []);

    return(
        <div>
            Работает
        </div>
    )
}

export default TestApi
