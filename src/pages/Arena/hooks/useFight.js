import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

const getRandomOneOrTwo = () => {
  return Math.floor(Math.random() * 2) + 1;
};

const getDamage = (attacker, defender) => {
  if (defender > attacker) return 0;
  return attacker - defender;
};

const getHitPower = (fighter) => {
  var criticalHitChance = getRandomOneOrTwo();
  var power = fighter.attack * criticalHitChance;
  return power;
  // return hit power
};

const getBlockPower = (fighter) => {
  var dodgeChance = getRandomOneOrTwo();
  var power = fighter.defense * dodgeChance;
  return power;
};

export const useFight = () => {
  const { selectedPair } = useArena();

  const fighterOneDetails = selectedPair.playerOne;
  const fighterTwoDetails = selectedPair.playerTwo;

  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  var keyPressedWithSuf = "Key" + keysPressed;

  var initialHealthOne = selectedPair.playerOne.health;
  var initialHealthTwo = selectedPair.playerTwo.health;

  if (keyPressedWithSuf === playerOneAttack) {
    var fistHitPow = getHitPower(selectedPair.playerOne);
    var fistBlockPow = getBlockPower(selectedPair.playerTwo);

    //block
    if (keyPressedWithSuf === playerTwoBlock) {
      fistHitPow = 0;
      fistBlockPow = 0;
    }

    var demagePlayertwo = getDamage(fistHitPow, fistBlockPow);
    fighterTwoDetails.health -= demagePlayertwo;
  }

  if (keyPressedWithSuf === playerTwoAttack) {
    var secondHitPow = getHitPower(selectedPair.playerTwo);
    var secondBlockPow = getBlockPower(selectedPair.playerOne);

    //block
    if (keyPressedWithSuf === playerOneBlock) {
      secondHitPow = 0;
      secondBlockPow = 0;
    }

    var demagePlayerOne = getDamage(secondHitPow, secondBlockPow);
    fighterOneDetails.health -= demagePlayerOne;
  }

  if (
    keyPressedWithSuf ===
    (playerOneCriticalHitCombination[0] ||
      playerOneCriticalHitCombination[1] ||
      playerOneCriticalHitCombination[2])
  ) {
    fistHitPow = 2 * getHitPower(selectedPair.playerOne);
    fistBlockPow = getBlockPower(selectedPair.playerTwo);
    demagePlayertwo = getDamage(fistHitPow, fistBlockPow);
    fighterTwoDetails.health -= demagePlayertwo;
  }

  if (
    keyPressedWithSuf ===
    (playerTwoCriticalHitCombination[0] ||
      playerTwoCriticalHitCombination[1] ||
      playerTwoCriticalHitCombination[2])
  ) {
    secondHitPow = 2 * getHitPower(selectedPair.playerOne);
    secondBlockPow = getBlockPower(selectedPair.playerTwo);
    demagePlayerOne = getDamage(secondHitPow, secondBlockPow);
    fighterTwoDetails.health -= demagePlayerOne;
  }

  // getwinner
  var winner;
  if (selectedPair.playerTwo.health <= 0) {
    winner = selectedPair.playerOne;
  }
  if (selectedPair.playerOne.health <= 0) {
    winner = selectedPair.playerTwo;
  }
  fighterOneDetails.initialHealth = initialHealthOne;
  fighterTwoDetails.initialHealth = initialHealthTwo;
  // implement fight logic, return fighters details and winner details

  return {
    fighterOneDetails,
    fighterTwoDetails,
    winner,
  };
};
