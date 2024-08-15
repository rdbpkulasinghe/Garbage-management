import { useState } from 'react';
import logo from './logo.png';
function NavBar({ location }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = JSON?.parse(localStorage?.getItem('user'));
	console.log(user);

	return (
		<nav>
			<div className="bg-cover bg-center bg-no-repeat  bg-[#ffffff62] shadow-lg">
				<div className="mx-auto px-4 sm:px-6 2xl:px-8 py-2">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center justify-between w-full">
							<div className="flex-shrink-0">
								<a href="/" className="text-black">
									<img src={logo} alt="logo" className="h-16" />
								</a>
							</div>
							<div className="hidden xl:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<a
										href="/"
										className="px-10 py-2 text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold whitespace-nowrap"
									>
										Home
									</a>
									<a
										href="/Greencaptain"
										className="px-10 py-2 text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold whitespace-nowrap"
									>
										Green Captain
									</a>

									{user.role !== 2 && (
										<>
											{user.role == 0 && (
												<a
													href="/Registration"
													className="px-10 py-2 block text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold whitespace-nowrap"
												>
													User Registration
												</a>
												
											)}
											{user.role == 0 &&(
												<a
												href="/article"
												className="px-10 py-2 text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold whitespace-nowrap"
											>
												Article
											</a>
											)}
											{user.role == 0 &&(
												<a
												href="/GTFmember"
												className="px-10 py-2 text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold whitespace-nowrap"
											>
												GTFmember
											</a>
											)}	
										</>
									)}

									<button
										type="button"
										className="px-10 py-2 text-md font-medium whitespace-nowrap bg-[#002bec] text-white rounded-2xl hover:bg-[#002bec] hover:text-black"
										onClick={() => {
											localStorage.removeItem('token');
											window.location.href = '/';
										}}
									>
										Log Out
									</button>
								</div>
							</div>
						</div>

						<div className="-mr-2 flex xl:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								type="button"
								className="bg-[#002bec] z-10 inline-flex items-center justify-center p-2 rounded-2xl text-white hover:text-black hover:bg-[#002bec] focus:outline-none "
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isMenuOpen && (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
								{isMenuOpen && (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<div className="xl:hidden bg-white absolute w-full right-0 top-0" id="mobile-menu">
						<div className="flex-shrink-0">
							<a href="/" className="text-black">
								<img src={logo} alt="logo" className="h-16 ml-3 mt-3" />
							</a>
						</div>
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<a
								href="/"
								className="px-10 py-2 block text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold"
							>
								Home
							</a>
							<a
								href="/Greencaptain"
								className="px-10 py-2 block text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold"
							>
								Green Captain
							</a>
							
							{user.role !== 2 && (
								<>
									
									{user.role == 0 && (
										<a
											href="/Registration"
											className="px-10 py-2 block text-md font-medium border-b-4 border-transparent hover:border-[#002bec] hover:font-bold"
										>
											User Registration
										</a>
									)}
									
								</>
							)}
							<button
								type="button"
								className="block px-10 py-2 text-md font-medium whitespace-nowrap w-full bg-[#002bec] text-white rounded-2xl hover:bg-[#002bec] hover:text-black"
								onClick={() => {
									localStorage.removeItem('token');
									window.location.href = '/';
								}}
							>
								Log Out
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
