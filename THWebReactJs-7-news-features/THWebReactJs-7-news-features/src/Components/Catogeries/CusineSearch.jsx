import React, { useState } from 'react'

const CusineSearch = ({ Data = [], selected, setselected }) => {
    console.log(Data?.length, "filtersData?.lenght");

    // const [filters, setfilters] = useState(Data?.length == 0 ?
    //     [
    //         {
    //             key: 1,
    //             title: "American",
    //         },
    //         {
    //             key: 2,
    //             title: "Arabic",
    //         },
    //         {
    //             key: 3,
    //             title: "Bakery",
    //         },
    //         {
    //             key: 4,
    //             title: "Coffee",
    //         },
    //         {
    //             key: 5,
    //             title: "Perks",
    //         },
    //         {
    //             key: 6,
    //             title: "Membership",
    //         },
    //         {
    //             key: 8,
    //             title: "App",
    //         },
    //         {
    //             key: 9,
    //             title: "App",
    //         },
    //         {
    //             key: 10,
    //             title: "App",
    //         },
    //         {
    //             key: 11,
    //             title: "App",
    //         },
    //         {
    //             key: 12,
    //             title: "App",
    //         },
    //         {
    //             key: 13,
    //             title: "App",
    //         },
    //         {
    //             key: 14,
    //             title: "App",
    //         },
    //         {
    //             key: 15,
    //             title: "App",
    //         },
    //         {
    //             key: 16,
    //             title: "App",
    //         },
    //         {
    //             key: 17,
    //             title: "App",
    //         },
    //         {
    //             key: 18,
    //             title: "App",
    //         },
    //         {
    //             key: 19,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "App",
    //         },
    //         {
    //             key: 20,
    //             title: "nhe",
    //         },
    //     ] : Data)
    return (
        <>
            <h1 className='Cusineh1'>Search by Cusine</h1>
            <div className="CusineSearch-filters">
                {Data?.map((filter) => {
                    return (
                        <>
                            {
                                false ? (
                                    <br></br>) : (
                                    <div key={filter?.id} className={`CusineSearch-filter ${filter?.id == selected?.id ? 'CusineSearchActive' : ''}`} onClick={() => setselected(filter)}>
                                        <p>{filter?.title}</p>
                                    </div>

                                )
                            }
                        </>
                    );
                })}
            </div>

        </>
    )

}

export default CusineSearch