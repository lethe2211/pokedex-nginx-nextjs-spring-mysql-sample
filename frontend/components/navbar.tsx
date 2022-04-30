const NavBar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-[#E4021C] p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Pokedex App</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                        Docs
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;