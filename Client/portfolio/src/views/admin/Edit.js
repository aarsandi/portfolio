import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import EditPost from '../../components/admin/form/EditPost'
import EditProject from '../../components/admin/form/EditProject'
import EditPostCategory from '../../components/admin/form/EditPostCategory'
import EditProjectCategory from '../../components/admin/form/EditProjectCategory'
import EditSkill from '../../components/admin/form/EditSkill'

export default function Edit() {
    const { pathname } = useLocation()
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push("/admin/login")
        }
    },[history])

    return (
        <>
            <AdminNavbar/>
            <div className="container-fluid">
                { pathname.slice(7, 11) === "post" &&     
                    <EditPost/>
                }
                { pathname.slice(7, 14) === "project" &&     
                    <EditProject/>
                }
                { pathname.slice(7, 17) === "catproject" &&     
                    <EditProjectCategory/>
                }
                { pathname.slice(7, 14) === "catpost" &&     
                    <EditPostCategory/>
                }
                { pathname.slice(7, 12) === "skill" &&     
                    <EditSkill/>
                }
            </div>
        </>
    )
}