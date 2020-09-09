import React from 'react';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">RestaurantApp</p>

                <p className="mt-3 text-gray-600">Your restaurant menu, orders and revenues, all in one!</p>

                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/">Menu</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/orders">Orders</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/pastorders">Past Orders</NavLink>
                </nav>
            </div>
            <div className="md:w-2/5 xl:w-1/5" style={{ bottom: 15, position: 'absolute' }}>
                <p style={{ color: 'white', textAlign: 'center' }}>Jose Daniel Jiménez</p>
            </div>
        </div>
    );
}

export default Sidebar;