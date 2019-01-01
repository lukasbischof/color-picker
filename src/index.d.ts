///<reference path="models/index.d.ts"/>

declare class ColorPicker {
  constructor(options: object);

  public present(callback?: (color: Color | undefined) => {});
  public dismiss();
}
