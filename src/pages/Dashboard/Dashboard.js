import React from 'react'
import Chart from '../../components/Chart/Chart'
import Navbar from '../../components/Navbar'

const Dashboard = () => {
  return (
    <div>
        <Navbar value="Sign-out"/>
        <div className='flex justify-center mt-2'>
            <h1 className='text-[#1678F2] text-2xl font-bold pb-5'>COPD Patients</h1>
            </div>
        <Chart/>
        <div className='flex justify-center  mt-10'>
            <h1 className='text-[#1678F2] text-2xl font-bold'>Average Analysis</h1>
            </div>
        <div className='flex justify-center pt-5 pb-8'>
            <div className='rounded-lg p-7 drop-shadow-md bg-[#FFFFFF] my-4 mx-4'>
                <h2 className='text-[#1678F2] text-xl'>Average CO2 levels</h2>
                <h6 className='text-md'>23.9</h6>
            </div>
            <div className='rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4'>
                <h2 className='text-[#1678F2] text-xl'>Average pH levels</h2>
                <h6 className='text-md'>7.38</h6>
            </div>
            <div className='rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4'>
                <h2 className='text-[#1678F2] text-xl'>Average HCO3 levels</h2>
                <h6 className='text-md'>11</h6>
            </div>
            <div className='rounded-lg p-6 drop-shadow-md bg-[#FFFFFF] my-4 mx-4'>
                <h2 className='text-[#1678F2] text-xl'>Average Na levels</h2>
                <h6 className='text-md'>135</h6>
            </div>
        </div>
    </div>
  )
}

export default Dashboard