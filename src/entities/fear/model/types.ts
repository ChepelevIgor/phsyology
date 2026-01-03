export type FearType = 'rejection' | 'control' | 'inadequacy';


export interface Fear {
id: FearType;
title: string;
mirror: string; // short psychological mirror
}