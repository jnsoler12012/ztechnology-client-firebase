import React, { useContext, useEffect, useState } from 'react'
import { CardTable } from '../Components/Cards'
import { MainContext } from '../../Infrastructure'
import { getAllSystemUser } from '../../Application/Axios/get'

export default function SystemUsers() {

  const [systemUsers, setSystemUsers] = useState([])
  const [mainContext, setMainContext] = useContext(MainContext)


  useEffect(() => {
    console.log("+++++++++++++++++++++ SYSTEM EFFECT", mainContext, systemUsers, mainContext?.services?.axios && systemUsers.length >= 0 && mainContext?.reload);

    if ((mainContext?.services?.axios && systemUsers.length >= 0) || mainContext?.reload) {
      console.log("@@@@@@@@@@@@@@ HACMEOS PETIUCION", mainContext);
      const getSystemUsersFunction = async () => {
        await getAllSystemUser({ context: { mainContext, setMainContext } })
          .then((data) => {
            console.log(data)
            if (!data.error)
              if (data?.data)
                if (data?.data?.data.length > 0)
                  setSystemUsers(data.data.data)
                else
                  setSystemUsers([])

          })
      }
      getSystemUsersFunction()
    }


    return () => {
      console.log("+OUT++++++++++++++++++++ SYSTEM EFFECT", mainContext);

      setMainContext((prevState) => ({
        ...prevState,
        notification: {}
      }))

    }
  }, [mainContext?.services, mainContext?.reload])

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable systemUsers={systemUsers} />
        </div>
      </div>
    </>
  )
}