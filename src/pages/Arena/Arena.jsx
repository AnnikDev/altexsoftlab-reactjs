import { HealthBar, Modal } from "../../components";
import "./Arena.scss";
import { useFight } from "./hooks";

var fighterOneInitialHealth = 0;
var fighterTwoInitialHealth = 0;

const Arena = () => {
  
  const { fighterOneDetails, fighterTwoDetails, winner } = useFight();

  if(fighterOneInitialHealth == 0 || fighterOneInitialHealth ==null)
    fighterOneInitialHealth = fighterOneDetails.health;

  if(fighterTwoInitialHealth == 0 || fighterTwoInitialHealth ==null)
    fighterTwoInitialHealth = fighterTwoDetails.health;
  
  fighterOneDetails.initialHealth = fighterOneInitialHealth;
  fighterTwoDetails.initialHealth = fighterTwoInitialHealth;

  return (
    <div className="arena">
      <Modal isShow={!!winner} name={winner?.name} url={winner?.avatar} />
      <div className="health-row">
        <HealthBar
          name={fighterOneDetails?.name}
          health={fighterOneDetails?.health}
          initial={fighterOneDetails?.initialHealth}
        />
        <HealthBar
          name={fighterTwoDetails?.name}
          health={fighterTwoDetails?.health}
          initial={fighterTwoDetails?.initialHealth}
          isRTL
        />
      </div>
      <div className="fighters-wrapper">
        <div className="col">
          <img src={fighterOneDetails?.source} alt="fighter-left" />
        </div>

        <div className="col is-rtl">
          <img src={fighterTwoDetails?.source} alt="fighter-right" />
        </div>
      </div>
    </div>
  );
};

export default Arena;
