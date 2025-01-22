import { EntityManager } from "./ComponentSystem/EntityManager";
import { Entity } from "./ComponentSystem/Entity";
import ThreeJSComponent from "./Components/ThreeJSComponent";
import GuiComponent from "./Components/GuiComponent";
import GroundComponent from "./Components/GroundComponent";
import HeadlightsComponent from "./Components/HeadlightsComponent";
import CarComponent from "./Components/CarComponent";

// This guy is global and will be connected to ALL entities
const entityManager = EntityManager.Init();

const threeJSEntity = new Entity("threeJSEntity");
threeJSEntity.AddComponent(new ThreeJSComponent());
threeJSEntity.Init();

const render = () => {
  const deltaT = (
    threeJSEntity.GetComponent("ThreeJSComponent") as ThreeJSComponent
  ).clock.getDelta();

  entityManager.Update(deltaT);
  requestAnimationFrame(render);
};

function main() {
  //const objectsEntity = new Entity("objectsEntity");
  //objectsEntity.AddComponent(new BoxComponent());
  //objectsEntity.Init();

  const headlightsEntity = new Entity("headlightsEntity");
  headlightsEntity.AddComponent(new HeadlightsComponent());
  headlightsEntity.Init();

  const groundEntity = new Entity("groundEntity");
  groundEntity.AddComponent(new GroundComponent());
  groundEntity.Init();

  const lightsEntity = new Entity("lightsEntity");
  lightsEntity.Init();

  const carEntity = new Entity("carEntity");
  carEntity.AddComponent(new CarComponent());
  carEntity.Init();

  const guiEntity = new Entity("guiEntity");
  guiEntity.AddComponent(new GuiComponent());
  guiEntity.Init();

  render();
}

main();
