import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function BreadCrumb() {
    const pathname = window.location.pathname
    const paths = pathname.split("/").filter(Boolean)
    const {theme} = useSelector(state=> state.theme)
    
  return (
    <nav className='my-3' aria-label='breadcrumb' >
        <ol className='flex items-center flex-wrap'>
            <li className={theme === "dark"? "text-gray-300": "text-zinc-500"}
            >
                <Link to={"/"} >
                    Home
                </Link>
            </li>
            {paths.map((path, index)=>{
                const fullPath = "/"+paths.slice(0, index+1).join("/");
                const formatted = decodeURIComponent(path).replace(/-/g," ");
                const isLast = paths.length -1 === index;

                return (
                  <li aria-current={isLast ? "page" : undefined} key={index}>
                   / {" "}
                    {!isLast ? (
                      <Link to={fullPath} className="">
                        {formatted}
                      </Link>
                    ) : (
                      formatted
                    )}
                  </li>
                );
            })}
        </ol>
    </nav>
  )
}
