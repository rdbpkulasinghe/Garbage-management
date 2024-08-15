import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import AllGTFmembers from './widgets/AllGTFmembers';
import districtJson from '../Data/Data.json';

function GTFmember() {
	const { districts } = districtJson;
	const [Greencaptainist, setGreencaptainist] = useState([]); // Greencaptainist is an array of users objects
	const [GreencaptainOne, setGreencaptainOne] = useState({}); // GreencaptainOne is a single users  object
	const [loading, setLoading] = useState(true);
	const user = JSON?.parse(localStorage?.getItem('user'));
	const fetchMedicines= async () => {
		try {
			const response = await GET(`/user/role/2`);
			setGreencaptainist(response);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMedicines();
	}, []);

	return (

		<div className="bg-cover bg-center bg-no-repeat h-full lg:h-screen bg-[#ffffff62]">
			<div className="flex">
				<div className='flex-1'>
					<AllGTFmembers
						Greencaptainist={Greencaptainist}
						loading={loading}
						setGreencaptainOne={setGreencaptainOne}
						districts={districts}
						fetchMedicines={fetchMedicines}
					/>
				</div>

				{/* {user?.role !== 2 && user?.role !== 1 && (
					
					<div className='flex-1'>
					<GreencaptainForm fetchMedicines={fetchMedicines} GreencaptainOne={GreencaptainOne} districts={districts} />
					</div> 
				)} */}
				
			</div>
		</div>
	);
}

export default GTFmember;
