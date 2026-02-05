// "use client";
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

// const FeaturedWork = () => {
//     const [featureWork, setFeatureWork] = useState<any>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch('/api/featured-work')
//                 if (!res.ok) throw new Error('Failed to fetch')
//                 const data = await res.json()
//                 setFeatureWork(data?.featureWork)
//             } catch (error) {
//                 console.error('Error fetching services:', error)
//             }
//         }

//         fetchData()
//     }, [])

//     return (
//         <section>
//             <div className="container">
//                 <div className="border-x border-primary/10">
//                     <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
//                         <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
//                             <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Featured work</p>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 border-t border-primary/10">
//                         {featureWork?.map((value: any, index: number) => {
//                             const isRightCol = index % 2 === 1;

//                             return (
//                                 <div
//                                     key={index}
//                                     className={`group flex flex-col gap-3.5 sm:gap-5 p-3.5 sm:p-6 ${isRightCol ? 'md:border-l md:border-primary/10' : ''}`}
//                                 >
//                                     <Link href={"/"} className="overflow-hidden">
//                                         <Image
//                                             src={value?.image}
//                                             alt="Image"
//                                             width={490}
//                                             height={300}
//                                             className="w-full h-full group-hover:scale-105 transition-all duration-300 ease-in-out "
//                                         />
//                                     </Link>
//                                     <div className="flex flex-col gap-1 sm:gap-2 px-2">
//                                         <Link href={"/"}><h4>{value?.title}</h4></Link>
//                                         <div className="flex">
//                                             <p>{value?.roles?.join(', ')}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                 </div>
//             </div>
//         </section>
//     )
// }

// export default FeaturedWork

"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

const FeaturedWork = () => {
    const [featureWork, setFeatureWork] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/featured-work')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setFeatureWork(data?.featureWork)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Featured work</p>
                        </div>
                    </div>
                    
                    {/* Single featured project section */}
                    <div className="border-t border-primary/10">
                        {featureWork?.map((value: any, index: number) => (
                            <div
                                key={index}
                                className="group flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8"
                            >
                                {/* Image container - takes about 60% width on large screens */}
                                <div className="lg:w-[58%] overflow-hidden">
                                    <Link href={"/"}>
                                        <Image
                                            src={value?.image || "/images/feature-work/feature-img-11.png"}
                                            alt={value?.title || "Featured work image"}
                                            width={800}
                                            height={500}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                                        />
                                    </Link>
                                </div>
                                
                                {/* Text content container - takes about 40% width on large screens */}
                                <div className="lg:w-[42%] flex flex-col justify-center gap-4 sm:gap-5 lg:pl-8">
                                    <div className="flex flex-col gap-3 sm:gap-4">
                                        <Link href={"/"}>
                                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                                {value?.title || "Guidra"}
                                            </h3>
                                        </Link>
                                        
                                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {value?.description || "Developed a modern brand identity and a responsive web experience tailored for a professional cleaning company, focused on clarity and usability."}
                                        </p>
                                        
                                        <div className="mt-2">
                                            <p className="text-sm sm:text-base text-primary font-medium">
                                                {value?.roles?.join(', ') || "UX Designer, Framer Designer"}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Optional button if you want to add one */}
                                    <div className="mt-2">
                                        <Link href={"/"}>
                                            <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                                Live here
                                                <svg 
                                                    className="ml-2 w-4 h-4" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedWork