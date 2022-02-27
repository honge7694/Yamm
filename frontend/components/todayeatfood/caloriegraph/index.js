import 'react-circular-progressbar/dist/styles.css';
import CircleGraph from './circlegraph';
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';

const CalorieGraph = () => {

    const nowTime = moment().format('YY년 MM월 DD일');
    const [tanDanGi, setTanDanGi] = useState([
        ["탄수화물", 20, 10],
        ["단백질", 10, 30],
        ["지방", 70, 60],
    ]);
    
    const [totalKcal, setTotalKcal] = useState(1309);
    
    const totalPercent = useCallback((totalKcal) => {
        return totalKcal/2000;
    }, [totalKcal]);
    
    return (
        <div className=' mt-12 mr-5 ml-5'>
            <div className='flex justify-end font-["Jalnan"] text-xs'>{nowTime}</div>

            <div className='flex justify-center mt-6 '>

                <div className=' w-11/12  items-end'>

                    <div className='flex justify-start text-xs mt-1'>총 섭취량 📌</div>
                    <div className='flex justify-end text-[8px]'>{totalKcal} / 2000 kcal</div>
                    
                    <div className='flex justify-center mt-2'>
                        <div className='h-[8px] flex justify-start w-full bg-blue-300 rounded-2xl'>
                        <div className='w-1/2 rounded-2xl bg-yellow-100 ease-linear duration-500'></div>
                    </div>
                    </div>        

                    <div className='flex justify-between mt-2 '>
                        {tanDanGi.map((tandangi, i)=>{
                            return <CircleGraph key={i} name={tandangi[0]} weight={tandangi[2]} percentage={tandangi[1]} />
                        })}
                    </div>

                </div>
            </div>

            
                       
        </div>
    );
};

export default CalorieGraph;