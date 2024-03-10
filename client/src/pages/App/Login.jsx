import { useParams } from "react-router-dom";
import { WaiterLogin } from "./WaiterLogin";
import { AdminAndAccountantLogin } from "./AdminAndAccountantLogin";

export const Login = () => {

    let { position } = useParams();

    return (
        <div>
            {position === 'Admin' || position === 'Accountant' ? <AdminAndAccountantLogin /> : null}
            {position === 'Waiter' ? <WaiterLogin /> : null}
        </div>
    )
}