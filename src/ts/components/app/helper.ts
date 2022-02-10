const getBody = (): HTMLElement | null => document.querySelector(`body`);
const getElementByClassName = (className: string): HTMLElement | null => document.querySelector(`.${className}`);
const getListOfElementsByClassName = async (className: string): Promise < NodeListOf < HTMLElement > | null > =>
  document.querySelectorAll(`.${className}`);
const getElementById = (idName: string): HTMLElement | null => document.getElementById(idName);
const setElementActive = async (element: HTMLElement): Promise < void > => element.classList.add(`active`);
const addClassForElement = async (element: HTMLElement, className: string): Promise < void > => element.classList.add(className);
const setElementInactive = async (element: HTMLElement): Promise < void > => element.classList.remove(`active`);
const removeClassForElement = async (element: HTMLElement, className: string): Promise < void > => element.classList.remove(className);
const toggleElement = async (element: HTMLElement): Promise < boolean > => element.classList.toggle(`active`);
const classListContains = (element: HTMLElement, className: string): boolean => element.classList.contains(className);
const getRandomElementForStringArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];
const getRandomHEXColorComponent = (): string => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
const getRandomHEXColor = (): string => {
  let HEXColor = '#';
  for (let i = 0; i < 3; i++) HEXColor += getRandomHEXColorComponent();
  return HEXColor;
}
const setAttributeForElements = (elements: HTMLElement[], attribute: string, value: string) => elements.forEach(el => el.setAttribute(attribute, value));
const applyStyle = (element: HTMLElement, style: string, value: string) => element.setAttribute(style, value);

export {
  getBody,
  getElementByClassName,
  getListOfElementsByClassName,
  getElementById,
  setElementActive,
  addClassForElement,
  setElementInactive,
  removeClassForElement,
  toggleElement,
  classListContains,
  getRandomElementForStringArray,
  getRandomHEXColor,
  setAttributeForElements,
  applyStyle,
};