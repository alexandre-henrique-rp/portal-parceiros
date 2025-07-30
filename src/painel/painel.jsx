/* eslint-disable jsx-a11y/anchor-is-valid */
import './painel.css';
import UserButton from './componente/userButton';
import EmConclusao from './componente/emConclusao';
import EmAnalise from './componente/emAnalize';
import EmAberto from './componente/emAberto';
import LOGO2 from '../img/LOGO2.svg';
import Test from './componente/test';








export default function Painel() {
     

     return (
          <div>
               <div className="painel">

                    <div className="container-lg">
                         <header>
                              <img src={LOGO2} alt="logo" className="Logo" />
                              <UserButton />
                         </header>
                    </div>
               </div>
               <div className="container-lg">
                    <div className="row g-3 mostrador justify-content-center">
                         <EmAberto />
                         <EmAnalise />
                         <EmConclusao />
                    </div>
               </div>
               <div className="container-lg">
                   <Test />
               </div>

          </div>
     );
}