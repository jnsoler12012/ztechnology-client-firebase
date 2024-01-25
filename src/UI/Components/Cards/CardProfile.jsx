import React from 'react'
import ProfileUser from 'Images/SettingsUser/profileUser.png'
import { FaBriefcase, FaRegIdCard } from "Web_React_Icons/fa";
import { LiaUniversitySolid } from "Web_React_Icons/lia";
import { MdAttachEmail } from "Web_React_Icons/md";
import { GrUserAdmin, GrUser } from "Web_React_Icons/gr";


export default function ({ user }) {
    const { createdAt, document, email, id, names, role, state } = user

    console.log(new Date(createdAt), createdAt, document, email, id, names, role, state);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <img
                                    alt="..."
                                    src={ProfileUser}
                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 text-center mt-20">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                        22
                                    </span>
                                    <span className="text-sm text-blueGray-400">Friends</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {names}
                        </h3>
                        <div className="flex justify-center items-center text-sm leading-normal mt-8 mb-1 text-blueGray-800 font-bold uppercase">
                            <MdAttachEmail className="mr-2 text-lg h-[1.4rem] w-[1.4rem]" />
                            {email}
                        </div>
                        <div className="flex justify-center items-center mb-2 text-blueGray-600 mt-5">
                            <FaRegIdCard className="mr-2 text-lg text-blueGray-600 h-[1.3rem] w-[1.3rem]" />
                            {document}
                        </div>
                        <div className="flex justify-center items-center mb-2 text-blueGray-600 mt-5">
                            {
                                role == 'ADMIN'
                                    ? (
                                        <GrUserAdmin className="mr-2 text-lg text-blueGray-600 h-[1.4rem] w-[1.4rem]" />
                                    )
                                    : (
                                        <GrUser className="mr-2 text-lg text-blueGray-600 h-[1.4rem] w-[1.4rem]" />
                                    )
                            }
                            {role}
                        </div>
                    </div>
                    <div className="mt-5 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    User Created at:
                                </p>
                                <p className="mb-4 text-lg leading-relaxed font-bold">
                                    {new Date(createdAt).toDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}