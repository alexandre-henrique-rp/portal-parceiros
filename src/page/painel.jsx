/* eslint-disable jsx-a11y/anchor-is-valid */
import '../painel/painel.css';
import UserButton from '../painel/userButton';
import EmConclusao from '../painel/emConclusao';
import EmAnalise from '../painel/emAnalize';
import EmAberto from '../painel/emAberto';
import LOGO2 from '../img/LOGO2.svg';
import Test from '../painel/test';








export default function Painel() {
     

     return (
          <div>
               <div className="painel">

                    <div className="container-lg">
                         <header>
                              <img src={LOGO2} alt="logo" className="Logo col-11" />
                              <UserButton />
                         </header>

                    </div>
               </div>
               <div className="container-lg">
                    <div className="row-lg gx-5 mostrador">
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