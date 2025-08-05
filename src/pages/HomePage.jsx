import headerBG from "../assets/images/headerBG.png";
import NewArrivals from "../components/componentPages/home/NewArrivals";
import Button from "../components/ui/Button";
import Marquee from "react-fast-marquee";
import Title from "../components/ui/Title";
import useWindowWidth from "../customHooks/useWindowWidth";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css"
import "swiper/css/navigation"
import { useRef } from "react";
import CustomerReviews from "../components/componentPages/home/CustomerReviews";
import Category from "../components/componentPages/home/Category";
import TopSellingCards from "../components/componentPages/home/TopSellingCards";
import { useGetBrandsQuery } from "../redux/RTK/brandsApi";
import { useGetProductsQuery } from "../redux/RTK/productsApi";
import { useGetCategoriesQuery } from "../redux/RTK/categoriesApi";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { data : brands } = useGetBrandsQuery();
  const { data: products } = useGetProductsQuery()
  
  const containerRef = useRef()
  const windowWidth = useWindowWidth()

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = windowWidth > 800 ? direction === "left" ? -500 : 500 : direction === "left" ? -300 : 300
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const {theme} = useSelector((store)=> store.theme)


  return (
    <>
      
      <section className=" bg-headerBackground dark:bg-dark px-5">
        <div className="container">
          <header className="grid lg:grid-cols-2 grid-cols-1 gap-10 pt-5">
            {/* left side */}
            <div className="flex flex-col gap-3  justify-center">
              <h1 className="font-cairo font-bold mt-10 text-4xl w-[315px] md:w-[500px]">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-descriptionColor md:w-auto sm:w-[358px] dark:text-slate-300 font-inter">
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense
                of style.
              </p>
              <Button className="lg:w-[210px] w-full mt-5">shop now</Button>
              <div className="scores flex flex-wrap gap-3 my-6 items-baseline">
                <span className="   px-4 font-inter ">
                  <p className="font-bold md:text-4xl text-2xl ">200+</p>
                  <p className="font-inter dark:text-slate-300 text-descriptionColor text-xs md:text-base">
                    International Brands
                  </p>
                </span>
                <span className=" px-4 font-inter">
                  <p className="font-bold md:text-4xl  text-2xl  ">2,000+</p>
                  <p className="font-inter dark:text-slate-300 text-descriptionColor text-xs md:text-base">
                    High-Quality Products
                  </p>
                </span>
                <span className="px-4 font-inter ">
                  <p className="font-bold md:text-4xl  text-2xl">30,000+</p>
                  <p className="font-inter dark:text-slate-300 text-descriptionColor text-xs md:text-base">
                    Happy Customers
                  </p>
                </span>
              </div>
            </div>
            {/* right side */}
            <div className="flex items-center relative brand ">
              <span className=" absolute top-10 right-5 ">
                <svg
                  className="w-[76px] h-[76px] lg:w-[104px] lg:h-[104px]"
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                    fill={`${theme === "dark"? 'white' : 'black'}`}
                  />
                </svg>
              </span>
              <span className=" absolute ">
                <svg
                  className=" lg:w-[56px] lg:h-[56px] w-[44px] h-[44px] "
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                    fill={`${theme === "dark"? 'white' : 'black'}`}
                  />
                </svg>
              </span>
              <img
                src={headerBG}
                alt="header"
                className="w-full object-cover h-full"
              />
            </div>
          </header>
        </div>
        {/* brands section */}
        <div className="bg-forground text-forgroundColor p-6 ">
          <Marquee pauseOnHover={true} speed={50}>
            {brands?.map((brand) => (
              < img src={`${brand.logo}`} alt={brand.name} key={brand._id} className="mx-12" />
            ))}
          </Marquee>
        </div>
      </section >
      {/* arrivals section */}
      <section >
        <NewArrivals products={products} />
      </section >

      {/* Top Selling section */}
      <section className="mt-10">
        <TopSellingCards products={products} />
      </section >

      {/* Category section */}
      <section>
        <Category />
      </section >

      {/* customer reviews section */}
      <section className="overflow-hidden mb-20 lg:mb-40" >
        <div className="container">
          <div className="flex justify-between px-2 items-center">
            <Title title="Our happy customers" />
            <div className="flex gap-4 items-center z-20 pb-8">
              <FaArrowLeft className="cursor-pointer" onClick={() => handleScroll("left")} />
              <FaArrowRight className="cursor-pointer" onClick={() => handleScroll("right")} />
            </div>
          </div>
        </div>
        <CustomerReviews containerRef={containerRef} />
      </section >
    </>
  );
};

export default HomePage;

