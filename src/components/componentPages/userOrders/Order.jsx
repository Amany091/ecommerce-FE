import React from 'react'

const Order = ({ orders, status }) => {
    const ords = orders?.filter((order) => order.status.toLowerCase() == status) ?? []
    console.log(ords, status)

    return (
        <div>
            {ords.length > 0 ? (
                ords.map((ord) => (
                    <div className='flex gap-2 my-4' key={ord.id}>
                        <img src={ord.orderItems[0].product.imgCover} alt="order" className='w-24' />
                        <div className='flex flex-col justify-between w-full font-inter leading-none'>
                            <div className='flex flex-col'>
                                <p className='font-inter text-xs lg:text-base' >{ord.orderItems[0].product.title}</p>
                                <span>
                                    <small >Size: <p className='text-descriptionColor inline' >{ord.orderItems[0].size}</p> </small>
                                </span>
                                <span>
                                    <small> Color: <p className='text-descriptionColor inline'>{[ord.orderItems[0].product.colors].join(",")}</p></small>
                                </span>
                            </div>
                            <div className='flex justify-between items-center align-bottom' >
                                <p className='text-bold text-sm lg:text-lg  ' >{ord.orderItems[0].product.price}$</p>
                                <span className='py-2 px-6 bg-inputBackground rounded-buttonRadius dark:text-black'> {ord.orderItems[0].quantity} piece</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No Orders Are {status} Yet</div>
            )}
        </div>
    )
}

export default Order
