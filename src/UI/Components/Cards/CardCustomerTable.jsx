import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { emptyTable } from '../../utils/svg';
import { FaUserEdit } from "Web_React_Icons/fa";
import { GiCancel } from "Web_React_Icons/gi";
import { postUpdateCustomer } from '../../../Application/Axios/post';

import CustomerUserPoto1 from 'Images/customer/customer1.jpg'
import CustomerUserPoto2 from 'Images/customer/customer2.jpg'
import CustomerUserPoto3 from 'Images/customer/customer3.jpg'
import CustomerUserPoto4 from 'Images/customer/customer4.png'
import CustomerUserPoto5 from 'Images/customer/customer5.jpg'
import CustomerUserPoto6 from 'Images/customer/customer6.jpg'
import CustomerUserPoto7 from 'Images/customer/customer7.jpg'
import { MainContext } from '../../../Infrastructure';
import { deleteCustomer } from '../../../Application/Axios/delete';


const randomPicture = [
  CustomerUserPoto1, CustomerUserPoto2, CustomerUserPoto3, CustomerUserPoto4, CustomerUserPoto5, CustomerUserPoto6, CustomerUserPoto7
]

export default function ({ customerData }) {
  const { register, handleSubmit, setValue, watch, clearErrors, resetField, getValues, reset, formState: { errors } } = useForm({});
  const [currentCustomerEditing, setCurrentCustomerEditing] = useState(0)
  const [mainContext, setMainContext] = useContext(MainContext)
  const refValuesForm = []

  const headers = {
    user: 'w-[5.11%] ',
    createdAt: 'w-[7.11%] ',
    names: 'w-[13.11%] ',
    document: 'w-[10.11%] ',
    email: 'w-[13.11%] ',
    phone: 'w-[10.11%] ',
    city: 'w-[8.11%] ',
    address: 'w-[14.11%] ',
    settings: 'w-[9.12%] ',
  }

  console.log(customerData.length > 0, customerData);

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onSubmit = (data, e) => {
    console.log("\\\\\\\\\\\\\\\\\\\ ENVIAREMOS", data);
    const customerEdited = Object.keys(data).reduce((prev, next) => {
      if (next.includes(currentCustomerEditing))
        Object.defineProperty(prev, `${(next).split('-')[1]}`, { value: data[next], enumerable: true })

      return prev
    }, {})
    console.log(customerEdited);

    (
      async () => await postUpdateCustomer({
        data: customerEdited,
        id: {
          idRequired: currentCustomerEditing
        },
        context: { mainContext, setMainContext }
      }).then(data => {
        console.log("||||CUSTOMER||||||||||||||| PETICION HECHA", data);
        if (data?.error) {
          setTimeout(() => {
            location.reload()
          }, 2000);
          setCurrentCustomerEditing(0)
        } else {
          setCurrentCustomerEditing(0)
        }
      })
    )()
  }

  const resetValuesPerCustomer = (idCustomer, prevRef) => {
    //console.log(refValuesForm, idCustomer, prevRef);
    const refFormToDelete = refValuesForm.reduce((prevRefs, nextRefs) => {
      //console.log();
      const selectedRefs = nextRefs.reduce((prev, next) => {
        const idProp = next.split('-')
        //console.log(next, idProp);
        if (next.includes(idCustomer)) {
          prev.push(next)
          resetField(next, { defaultValue: prevRef[idProp[1]].value })
        }
        return prev
      }, [])
      if (selectedRefs.length > 0)
        prevRefs.push(selectedRefs)
      return prevRefs
    }, [])
    console.log(refFormToDelete);
    setCurrentCustomerEditing(0)
  }

  const handleUserDeletion = (idDeleteUser, e) => {
    (
      async () => await deleteCustomer({
        data: { idCustomer: idDeleteUser },
        userId: {
          idUserRequester: mainContext.user?.info?.id,
        },
        context: { mainContext, setMainContext }
      }).then(data => {
        if (!data?.error) {
          setTimeout(() => {
            setMainContext((prevState => ({
              ...prevState,
              reload: true
            })))
          }, 3000);
        }
      })
    )()
  }

  const handleUserEdit = (id) => {

    setCurrentCustomerEditing(prevState => {
      if (prevState)
        return 0
      else
        return id
    })
  }


  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg text-blueGray-700"
                }
              >
                Clients
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {
            customerData.length > 0 ? (
              <form id="modify-user-form" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      {
                        Object.keys(headers).map(header => {
                          return (
                            ['user', 'createdAt'].includes(header)
                              ? (
                                <th
                                  key={`${header}-header`}
                                  className={
                                    `${headers[header]} px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100 `}
                                >
                                  {header}
                                </th>
                              )
                              : ['settings'].includes(header) ? (
                                (
                                  <th
                                    key={`${header}-header`}
                                    className={
                                      `${headers[header]} px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                  >

                                  </th>
                                )
                              )
                                : (
                                  <th
                                    key={`${header}-header`}
                                    className={
                                      `${headers[header]} px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100`}
                                  >
                                    {header}
                                  </th>
                                )
                          )
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      customerData.map((singleCustomer) => {
                        //console.log(singleCustomer);
                        refValuesForm.push(
                          Object.keys(singleCustomer).reduce((prev, nextPropCustomerRef) => {
                            //console.log(prev);
                            if (!['id', 'user', 'createdAt', 'settings'].includes(nextPropCustomerRef))
                              prev.push(singleCustomer[nextPropCustomerRef].idAttr)
                            return prev
                          }, [])
                        )
                        return (
                          <tr id={`TR-${singleCustomer.id.value}`} key={`TR-${singleCustomer.id.value}`}>
                            {
                              Object.keys(headers).map(header => {

                                return Object.keys(singleCustomer).map(propCustomer => {

                                  // refValuesForm.push(singleCustomer[propCustomer].idAttr)
                                  //console.log(propCustomer, header, header == propCustomer);

                                  if (header == propCustomer)
                                    return (
                                      (['user', 'createdAt'].includes(propCustomer))
                                        ? (
                                          <td
                                            id={`TD-${singleCustomer[propCustomer].idAttr}`}
                                            key={`TD-${singleCustomer[propCustomer].idAttr}`}
                                            className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4">
                                            {
                                              propCustomer == 'user'
                                                ? (
                                                  <div className='flex justify-center'>
                                                    <img
                                                      src={randomPicture[Math.floor(Math.random() * randomPicture.length)]}
                                                      alt="..."
                                                      style={{ minWidth: '2.5rem' }}
                                                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                                    ></img>
                                                  </div>
                                                )
                                                : (
                                                  <input
                                                    type="text"
                                                    defaultValue={(propCustomer == 'createdAt' ? new Date(singleCustomer[propCustomer]?.value).toDateString() : `${singleCustomer[propCustomer]?.value.names}`)}
                                                    className={`text-[0.75rem] p-[2px] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 w-[7rem] xl:w-[100%]`}
                                                    disabled={true}
                                                  />
                                                )
                                            }
                                          </td>
                                        )
                                        : ['settings'].includes(propCustomer)
                                          ? (
                                            <td
                                              id={`TD-${singleCustomer[propCustomer].idAttr}`}
                                              key={`TD-${singleCustomer[propCustomer].idAttr}`}
                                              className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-right" >
                                              {
                                                currentCustomerEditing == singleCustomer.id.value
                                                  ? (
                                                    <div id='editOptionTrue' className='flex justify-between items-center'>
                                                      <input
                                                        className="flex cursor-pointer content-center justify-center items-center bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-[3px] py-[3px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-1 ok-button-icon"
                                                        type='submit'
                                                      >
                                                        {/* <GiConfirmed style={{ width: '23px', height: '23px' }} /> */}
                                                      </input>
                                                      <button
                                                        className="flex content-center justify-center items-center bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-[3px] py-[3px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-1 w-[29px] h-[29px]"
                                                        type="button"
                                                        onClick={() => resetValuesPerCustomer(singleCustomer.id.value, singleCustomer)}
                                                      >
                                                        <GiCancel style={{ width: '23px', height: '23px' }} />
                                                      </button>
                                                      <div className=' h-auto bg-red-300 hover:w-[5rem] hover:fixed hover:right-[34px] [writing-mode:vertical-lr] transform -rotate-180 uppercase text-xs font-bold hover:after:content-["options"] hover:after:block hover:[writing-mode:horizontal-tb] hover:-rotate-0 hover:text-center hover:bg-red-400 hover:font-bold cursor-pointer'
                                                        onClick={(e) => handleUserDeletion(singleCustomer.id.value, e)}
                                                      >
                                                        delete
                                                      </div>
                                                    </div>

                                                  ) : (
                                                    <button
                                                      className="flex content-center justify-center items-center bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-[8px] py-[7px] rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-4"
                                                      type="button"
                                                      onClick={() => { handleUserEdit(singleCustomer.id.value) }}
                                                    >
                                                      <FaUserEdit style={{ width: '1rem', marginRight: '7px' }} />
                                                      Settings
                                                    </button>
                                                  )
                                              }
                                            </td>
                                          )
                                          : (
                                            <td
                                              className="text-wrap border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs pr-4 py-2"
                                              id={`TD-${singleCustomer[propCustomer]?.idAttr}`}
                                              key={`TD-${singleCustomer[propCustomer]?.idAttr}`}
                                            >
                                              <input
                                                id={`${singleCustomer[propCustomer]?.idAttr}`}
                                                defaultValue={singleCustomer[propCustomer]?.value}
                                                type="text"
                                                className={`${currentCustomerEditing == singleCustomer.id.value && 'px-1 outline outline-1 outline-[#cfcfcf] '} text-[0.75rem] p-[2px] peer block min-h-[auto] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 w-[7rem] xl:w-[100%]`}
                                                disabled={currentCustomerEditing == singleCustomer.id.value ? false : true}
                                                {...register(`${singleCustomer[propCustomer]?.idAttr}`, {
                                                  value: singleCustomer[propCustomer]?.value,
                                                  required: `${propCustomer} is required`,
                                                  pattern: {
                                                    value: singleCustomer[propCustomer]?.pattern?.value,
                                                    message: singleCustomer[propCustomer]?.pattern?.message
                                                  },
                                                })}
                                              />
                                              {
                                                //errors?.['test']?.type  {errors?.['test']?.message}
                                                errors?.[`${singleCustomer[propCustomer]?.idAttr}`]?.type &&
                                                <p key={`${singleCustomer[propCustomer]?.idAttr}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden">
                                                  {errors?.[`${singleCustomer[propCustomer]?.idAttr}`]?.message}
                                                </p>
                                              }
                                            </td>
                                          )
                                    )
                                })
                              })
                            }
                          </tr>
                        )

                      })

                    }
                  </tbody>

                </table>
              </form>
            ) : (
              <div className='flex h-[13rem] items-center flex-col justify-center'>
                {emptyTable}
                <h3>Empty table</h3>
              </div>
            )
          }
        </div>
      </div >
    </>
  )
}