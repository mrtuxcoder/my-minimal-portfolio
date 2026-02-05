import Link from "next/link"

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="-translate-y-[1px] bg-white border-t border-primary/10">
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-7 py-6 md:py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-600">
                                © {currentYear} Guganraj Rengaraju,  All rights reserved.
                            </p>
                            <div className="flex gap-6">
                                <Link 
                                    href="https://github.com/mrtuxcoder" 
                                    target="_blank" 
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    GitHub
                                </Link>
                                <Link 
                                    href="https://www.linkedin.com/in/guganraj-rengaraju/" 
                                    target="_blank" 
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    LinkedIn
                                </Link>
                                <Link 
                                    href="https://x.com/mrtuxcoder" 
                                    target="_blank" 
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    X
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer