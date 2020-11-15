import React, {useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AdminNavbar from '../../components/admin/Navbar'
import ProjectTable from '../../components/admin/table/ProjectTable'
import PostTable from '../../components/admin/table/PostTable'
import PostCategoryTable from '../../components/admin/table/PostCategoryTable'
import ProjectCategoryTable from '../../components/admin/table/ProjectCategoryTable'
import SkillTable from '../../components/admin/table/SkillTable'

export default function Browse() {
    const { pathname } = useLocation()
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            history.push("/admin/login")
        }
    },[history])
  
    return (
        <>
            <AdminNavbar/>
            <div className="container">
                {pathname.slice(7, 12) === "posts" &&     
                    <PostTable/>
                }
                {pathname.slice(7, 15) === "projects" &&     
                    <ProjectTable/>
                }
                {pathname.slice(7, 21) === "postcategories" &&     
                    <PostCategoryTable/>
                }
                {pathname.slice(7, 24) === "projectcategories" &&     
                    <ProjectCategoryTable/>
                }
                {pathname.slice(7, 13) === "skills" &&     
                    <SkillTable/>
                }
            </div>
        </>
    )
}