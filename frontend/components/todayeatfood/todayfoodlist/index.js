import Image from "next/image";
import FoodItem from "./fooditem";
import FoodItemm from "./fooditemm";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from "./loader";
import { testData } from './datacuthook';

const TodayFoodList = () => {
    
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('/api/yammfoodeaten')
        .then((res) =>{
            //console.log(res.data[0]["img"],"food")
            setData(arr => [...data, res.data])
        });
    }, []);

    return (
        <div>
            <div className="mt-10 ml-5 mr-5 bg-slate-100 rounded-2xl shadow-2xl">
                {console.log(testData[0], "testData here")}
                {/*data.length == 0 ? <Loader /> : data[0].map((foodData, i) => {
                    return <FoodItem key={i} foodData={foodData} />
                })*/}
                { data.length != 0 && <FoodItemm foodData={data[0][0]} testData={testData[0]} /> }
                { data.length != 0 && <FoodItemm foodData={data[0][1]} testData={testData[1]} /> }
                { data.length != 0 && <FoodItemm foodData={data[0][2]} testData={testData[2]} /> }
                { data.length != 0 && <FoodItemm foodData={data[0][3]} testData={testData[0]} /> }
            </div>
        </div>
    );
};

export default TodayFoodList;