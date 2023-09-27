import Phaser from "phaser";
import { PauseButtonTsx, SettingButtonTsx, PlayButtonTsx } from "../tsx";

export default class ButtonHelper {
  static pause(scene: Phaser.Scene, x: number, y: number) {
    const pauseButtonElement = scene.add.dom(x, y, PauseButtonTsx() as HTMLElement);
    pauseButtonElement.addListener("pointerover").on("pointerover", () => {
      (pauseButtonElement.node as HTMLInputElement).style.backgroundColor = "#e6e6e6";
      (pauseButtonElement.node as HTMLInputElement).style.transition = "background-color 0.5s ease";
    });
    pauseButtonElement.addListener("pointerout").on("pointerout", () => {
      (pauseButtonElement.node as HTMLInputElement).style.backgroundColor = "#d3d3d3";
    });
    pauseButtonElement.setAlpha(0.7);
    return pauseButtonElement;
  }

  static setting(scene: Phaser.Scene, x: number, y: number) {
    const settingButtonElement = scene.add.dom(x, y, SettingButtonTsx() as HTMLElement);
    settingButtonElement.addListener("pointerover").on("pointerover", () => {
      (settingButtonElement.node as HTMLInputElement).style.backgroundColor = "#e6e6e6";
      (settingButtonElement.node as HTMLInputElement).style.transition = "background-color 0.5s ease";
    });
    settingButtonElement.addListener("pointerout").on("pointerout", () => {
      (settingButtonElement.node as HTMLInputElement).style.backgroundColor = "#d3d3d3";
    });
    settingButtonElement.setAlpha(0.7);
    return settingButtonElement;
  }

  static play(scene: Phaser.Scene, x: number, y: number) {
    const playButtonElement = scene.add.dom(x, y, PlayButtonTsx() as HTMLElement);
    playButtonElement.addListener("pointerover").on("pointerover", () => {
      (playButtonElement.node as HTMLInputElement).style.backgroundColor = "#e6e6e6";
      (playButtonElement.node as HTMLInputElement).style.transition = "background-color 0.5s ease";
    });
    playButtonElement.addListener("pointerout").on("pointerout", () => {
      (playButtonElement.node as HTMLInputElement).style.backgroundColor = "#d3d3d3";
    });
    return playButtonElement;
  }
}