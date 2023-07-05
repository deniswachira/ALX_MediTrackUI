import { useContext } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import imagePlaceholder from "../images/placeholder.png";
import { Context } from "../context/Context";

function Profile() {
    const { user } = useContext(Context);

    return (
        <>
            <div className="flex flex-row mt-60px sm:h-fit md:h-full bg-base-200 ">
                <UserProfileSidebar />

                <main className="container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-full mx-2 mb-3">

                    <>
                        <div className="avatar bg-base-100 rounded-box p-2 mt-2">
                            <div className="w-3/4 mask mask-hexagon grid mx-auto">
                                {user.photo ? (
                                    <img src="" className="w-full h-full object-cover" alt="no pic" />
                                ) : (
                                    <img className="place-self-center" src={imagePlaceholder} alt="no pic" />
                                )}
                                <div>
                                    <button className="btn btn-accent">Edit Profile</button>
                                </div>
                            </div>
                        </div>
                        <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl">
                            <li><a href="#">Full Names : {user?.name}</a> </li>
                            <li><a href="#">Age : {user?.age} yrs</a></li>
                            <li><a href="#">Gender : {user?.gender}</a> </li>
                            <li><a href="#">Phone : {user?.phone}</a></li>
                            <li><a href="#">Medical_level : {user?.medical_level}</a></li>

                        </ul>
                        <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl justify-center">
                            <li><a>Username : {user?.email}</a></li>
                            <li><a>Password : ******</a></li>
                        </ul>
                    </>
                </main>
            </div>

        </>
    );
}

export default Profile;