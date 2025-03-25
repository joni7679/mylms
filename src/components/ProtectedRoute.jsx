import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);
    return user ? children : navigate("/login");

};

export default ProtectedRoute;