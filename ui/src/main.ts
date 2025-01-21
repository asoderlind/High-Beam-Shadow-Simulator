import { EntityManager } from "./ComponentSystem/EntityManager";
import { Entity } from "./ComponentSystem/Entity";
import ThreeJSComponent from "./Components/ThreeJSComponent";
import BoxComponent from "./Components/BoxComponent";
import GuiComponent from "./Components/GuiComponent";

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
  const objectsEntity = new Entity("objectsEntity");
  objectsEntity.AddComponent(new BoxComponent());
  objectsEntity.Init();

  const lightsEntity = new Entity("lightsEntity");
  lightsEntity.Init();

  const guiEntity = new Entity("guiEntity");
  guiEntity.AddComponent(new GuiComponent());
  guiEntity.Init();

  render();
}

main();
