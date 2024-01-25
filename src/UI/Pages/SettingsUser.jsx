import React, { useContext } from 'react'
import { CardProfile, CardUserInfo } from '../Components/Cards'
import { MainContext } from '../../Infrastructure'

export default function () {
    const [mainContext, setMainContext] = useContext(MainContext)
    const { user: { info } } = mainContext
    console.log('\||||||||||||||||||||||||||||||||||', info);

    return (
        <>
            <div className="flex flex-wrap lg:flex-row flex-col-reverse">
                <div className="w-full lg:w-8/12 px-4">
                    <CardUserInfo user={info} />
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile user={info} />
                </div>
            </div>
        </>
    )
}