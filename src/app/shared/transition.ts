import {
    trigger,
    transition,
    style,
    query,
    animate,
    group
  } from '@angular/animations';
  
  export const fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('0.3s ease', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('0.3s ease', style({ opacity: 0 }))
        ], { optional: true })
      ])
    ])
  ]);
  