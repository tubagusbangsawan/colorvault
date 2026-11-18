import { GradientConfig } from '../../types';

export interface GradientPreset {
  id: string;
  name: string;
  config: GradientConfig;
}

export const PRESET_GRADIENTS: GradientPreset[] = [
  {
    id: 'preset-1',
    name: 'Electric Matrix',
    config: {
      type: 'linear',
      angle: 135,
      stops: [
        { id: '1', color: '#2020FF', position: 0 },
        { id: '2', color: '#39FF14', position: 50 },
        { id: '3', color: '#080808', position: 100 },
      ],
    },
  },
  {
    id: 'preset-2',
    name: 'Signal Warning',
    config: {
      type: 'linear',
      angle: 90,
      stops: [
        { id: '1', color: '#FF321C', position: 0 },
        { id: '2', color: '#FFDE00', position: 50 },
        { id: '3', color: '#080808', position: 100 },
      ],
    },
  },
  {
    id: 'preset-3',
    name: 'Monochrome Glaze',
    config: {
      type: 'linear',
      angle: 45,
      stops: [
        { id: '1', color: '#080808', position: 0 },
        { id: '2', color: '#777777', position: 50 },
        { id: '3', color: '#EEEEEE', position: 100 },
      ],
    },
  },
  {
    id: 'preset-4',
    name: 'Acid Terminal',
    config: {
      type: 'linear',
      angle: 160,
      stops: [
        { id: '1', color: '#39FF14', position: 0 },
        { id: '2', color: '#080808', position: 50 },
        { id: '3', color: '#2020FF', position: 100 },
      ],
    },
  },
  {
    id: 'preset-5',
    name: 'Radial Void',
    config: {
      type: 'radial',
      angle: 0,
      stops: [
        { id: '1', color: '#FF321C', position: 0 },
        { id: '2', color: '#2020FF', position: 60 },
        { id: '3', color: '#080808', position: 100 },
      ],
    },
  },
  {
    id: 'preset-6',
    name: 'Cyan Volt',
    config: {
      type: 'linear',
      angle: 120,
      stops: [
        { id: '1', color: '#00FFFF', position: 0 },
        { id: '2', color: '#2020FF', position: 50 },
        { id: '3', color: '#080808', position: 100 },
      ],
    },
  },
  {
    id: 'preset-7',
    name: 'Solar Flare',
    config: {
      type: 'linear',
      angle: 45,
      stops: [
        { id: '1', color: '#EA580C', position: 0 },
        { id: '2', color: '#FFDE00', position: 50 },
        { id: '3', color: '#FF321C', position: 100 },
      ],
    },
  },
  {
    id: 'preset-8',
    name: 'Obsidian Paper',
    config: {
      type: 'linear',
      angle: 180,
      stops: [
        { id: '1', color: '#EEEEEE', position: 0 },
        { id: '2', color: '#888888', position: 50 },
        { id: '3', color: '#080808', position: 100 },
      ],
    },
  },
];
