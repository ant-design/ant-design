import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getScroll from '../_util/getScroll';
import Affix from './';

// ======================== Observer ========================
const TRIGGER_EVENTS = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

interface ObserverEntity {
  target: HTMLElement | Window;
  affixList: Affix[];
  eventHandlers: { [eventName: string]: any };
}

let observerEntities: ObserverEntity[] = [];

export function addObserveTarget(target: HTMLElement | Window | null, affix: Affix): void {
  console.log('???', target);
  if (!target) return;

  let entity: ObserverEntity | undefined = observerEntities.find(item => item.target === target);

  if (entity) {
    entity.affixList.push(affix);
  } else {
    entity = {
      target,
      affixList: [affix],
      eventHandlers: {},
    };
    observerEntities.push(entity);

    // Add listener
    TRIGGER_EVENTS.forEach(eventName => {
      entity!.eventHandlers[eventName] = addEventListener(target, eventName, (event: Event) => {
        entity!.affixList.forEach(affix => {
          affix.updatePosition(event);
        });
      });
    });
  }
}

export function removeObserveTarget(affix: Affix): void {
  const observerEntity = observerEntities.find(oriObserverEntity => {
    const hasAffix = oriObserverEntity.affixList.some(item => item === affix);
    if (hasAffix) {
      oriObserverEntity.affixList = oriObserverEntity.affixList.filter(item => item !== affix);
    }
    return hasAffix;
  });

  if (observerEntity && observerEntity.affixList.length === 0) {
    observerEntities = observerEntities.filter(item => item !== observerEntity);

    // Remove listener
    TRIGGER_EVENTS.forEach(eventName => {
      const handler = observerEntity.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }
}

export function getTargetRect(target: HTMLElement | Window | null): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as ClientRect);
}

export function getOffset(element: HTMLElement, target: HTMLElement | Window | null) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height,
  };
}
