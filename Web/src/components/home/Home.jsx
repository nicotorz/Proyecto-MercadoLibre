import AllProduct from "../producto/AllProductComponent";
import Template from "../template/Template";

const Home = ({isLoged}) =>{
    return(
        <>
        <Template>
        <AllProduct isLoged={isLoged}/>
        </Template>
        </>
    )

};
export default Home;


