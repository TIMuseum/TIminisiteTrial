(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    180: function (e, t, s) {
      "use strict";
      s.r(t);
      const r = {
          mq: { medium: 1e3 },
          countMax: 3e4,
          pointLength: 15,
          ease: 0.05,
          under: {
            color: 15719371,
            size: { w: 1e4, h: 1e4 },
            pos: { x: 0, y: 0, z: -1800 },
            renderOrder: -1500,
          },
          ground: {
            color: 3302490,
            size: { inR: 100, outR: 1e4, seg: 40 },
            pos: { x: -100, y: 150, z: -20 },
            renderOrder: -20,
          },
          map: [
            {
              imgPath: "/misatoto/assets/home/map.png",
              size: { w: 1e3, h: 1e3 },
              pos: { x: 0, y: 0, z: -0.1 },
              renderOrder: -1,
            },
          ],
        },
        o = 200,
        i = {
          __camera: {
            pos: [
              { x: 0, y: -3e3, z: 1e3, mobZ: 1e3, rx: Math.PI / 2 },
              { x: 0, y: -1e3, z: 1e3, mobZ: 1e3, rx: Math.PI / 2 },
              { x: 0, y: 0, z: 1200, mobZ: 1200 + o, rx: 0 },
              { x: 0, y: -250, z: 280, mobZ: 280 + o, rx: 0 },
              { x: 205, y: -60, z: 280, mobZ: 280 + o, rx: 0 },
              { x: -85, y: -1, z: 280, mobZ: 280 + o, rx: 0 },
              { x: -159.3, y: 117.5, z: 0, mobZ: 0, rx: 0 },
              { x: -140, y: 118, z: -570, mobZ: -570 + o, rx: 0 },
              { x: 196, y: 150, z: -970, mobZ: -970 + o, rx: 0 },
              { x: 396, y: 150, z: -400, mobZ: -570 + o, rx: 0 },
              { x: -103, y: 149.65, z: 0, mobZ: 0, rx: 0 },
              { x: -250, y: 228, z: 280, mobZ: 280 + o, rx: 0 },
              { x: 0, y: 0, z: 1200, mobZ: 1200, rx: 0 },
              { x: 0, y: -1e3, z: 1e3, mobZ: 1e3, rx: Math.PI / 2 },
              { x: 0, y: -3e3, z: 1e3, mobZ: 1e3, rx: Math.PI / 2 },
            ],
          },
        },
        a = {
          __cloud: {
            textures: {
              cloud_1: "/misatoto/assets/home/cloud/cloud_1.png",
              cloud_2: "/misatoto/assets/home/cloud/cloud_2.png",
              cloud_light_1: "/misatoto/assets/home/cloud/cloud_light_1.png",
              cloud_light_2: "/misatoto/assets/home/cloud/cloud_light_2.png",
              cloud_light_3: "/misatoto/assets/home/cloud/cloud_light_3.png",
              cloud_light_4: "/misatoto/assets/home/cloud/cloud_light_4.png",
              cloud_light_5: "/misatoto/assets/home/cloud/cloud_light_5.png",
            },
            cloud: [
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 1843.2, h: 511.2 },
                pos: {
                  x: 750,
                  y: -1900,
                  z: 700,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_1",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 276 },
                pos: {
                  x: -200,
                  y: -1850,
                  z: 600,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 2,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 1945.6, h: 446.5 },
                pos: {
                  x: -400,
                  y: -1800,
                  z: 650,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 1843.2, h: 351 },
                pos: {
                  x: -1e3,
                  y: -1700,
                  z: 850,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_2",
                mesh: null,
                material: null,
                size: { w: 1024, h: 246 },
                pos: {
                  x: 700,
                  y: -1650,
                  z: 900,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 2,
              },
              {
                texture: "cloud_light_4",
                mesh: null,
                material: null,
                size: { w: 1638.4, h: 328 },
                pos: {
                  x: -700,
                  y: -1600,
                  z: 950,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_2",
                mesh: null,
                material: null,
                size: { w: 819.2, h: 196.8 },
                pos: {
                  x: -700,
                  y: -1550,
                  z: 1100,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 2,
              },
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 340.8 },
                pos: {
                  x: 680,
                  y: -1500,
                  z: 1050,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 282 },
                pos: {
                  x: -350,
                  y: -1400,
                  z: 1250,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_2",
                mesh: null,
                material: null,
                size: { w: 1024, h: 240 },
                pos: {
                  x: -900,
                  y: -1350,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 1024, h: 195 },
                pos: {
                  x: 900,
                  y: -1300,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_4",
                mesh: null,
                material: null,
                size: { w: 1126.4, h: 410 * 0.55 },
                pos: {
                  x: 300,
                  y: -1250,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 921.6, h: 255.6 },
                pos: {
                  x: -600,
                  y: -1300,
                  z: 1580,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 819.2, h: 188 },
                pos: {
                  x: -1200,
                  y: -1200,
                  z: 1700,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_2",
                mesh: null,
                material: null,
                size: { w: 1024, h: 240 },
                pos: {
                  x: 100,
                  y: -1200,
                  z: 1660,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_1",
                mesh: null,
                material: null,
                size: { w: 819.2, h: 184 },
                pos: {
                  x: 500,
                  y: -1250,
                  z: 1700,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 2,
              },
              {
                texture: "cloud_light_4",
                mesh: null,
                material: null,
                size: { w: 1024, h: 205 },
                pos: {
                  x: 1e3,
                  y: -1300,
                  z: 1650,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 1843.2, h: 511.2 },
                pos: {
                  x: 1050,
                  y: -400,
                  z: 1100,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 1433.6, h: 329 },
                pos: {
                  x: -750,
                  y: -500,
                  z: 1200,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_2",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 295.2 },
                pos: {
                  x: -780,
                  y: -350,
                  z: 1e3,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 2,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 234 },
                pos: {
                  x: -500,
                  y: -300,
                  z: 650,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 282 },
                pos: { x: 650, y: -200, z: 600, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_2",
                mesh: null,
                material: null,
                size: { w: 1638.4, h: 384 },
                pos: {
                  x: -350,
                  y: -200,
                  z: 1650,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 246 },
                pos: {
                  x: 800,
                  y: -100,
                  z: 1420,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: 0,
                },
                colorType: 1,
              },
              {
                texture: "cloud_light_4",
                mesh: null,
                material: null,
                size: { w: 1228.8, h: 246 },
                pos: { x: 500, y: 500, z: 800, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 409.6, h: 568 * 0.2 },
                pos: { x: -200, y: 600, z: 500, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 409.6, h: 94 },
                pos: { x: 500, y: 600, z: 500, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_2",
                mesh: null,
                material: null,
                size: { w: 409.6, h: 96 },
                pos: { x: 100, y: 800, z: 500, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 409.6, h: 96 },
                pos: { x: -800, y: 1e3, z: 500, rx: Math.PI / 2, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 209, h: 48.5 },
                pos: { x: -250, y: 60, z: 500, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_1",
                mesh: null,
                material: null,
                size: { w: 141, h: 34 },
                pos: { x: -170, y: 35, z: 600, rx: 0, ry: 0, rz: 0 },
                colorType: 2,
              },
              {
                texture: "cloud_light_1",
                mesh: null,
                material: null,
                size: { w: 209, h: 48.5 },
                pos: { x: 220, y: 180, z: 500, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_2",
                mesh: null,
                material: null,
                size: { w: 143.36, h: 492 * 0.07 },
                pos: { x: 200, y: 150, z: 560, rx: 0, ry: 0, rz: 0 },
                colorType: 2,
              },
              {
                texture: "cloud_light_5",
                mesh: null,
                material: null,
                size: { w: 204.8, h: 568 * 0.1 },
                pos: { x: 220, y: -120, z: 500, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_1",
                mesh: null,
                material: null,
                size: { w: 141, h: 34 },
                pos: { x: 200, y: -120, z: 600, rx: 0, ry: 0, rz: 0 },
                colorType: 2,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 143.36, h: 390 * 0.07 },
                pos: { x: -240, y: -140, z: 550, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_light_2",
                mesh: null,
                material: null,
                size: { w: 204.8, h: 48 },
                pos: { x: -150, y: -220, z: 500, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
              {
                texture: "cloud_2",
                mesh: null,
                material: null,
                size: { w: 143.36, h: 492 * 0.07 },
                pos: { x: -160, y: -170, z: 600, rx: 0, ry: 0, rz: 0 },
                colorType: 2,
              },
              {
                texture: "cloud_light_3",
                mesh: null,
                material: null,
                size: { w: 143.36, h: 390 * 0.07 },
                pos: { x: 300, y: -50, z: 550, rx: 0, ry: 0, rz: 0 },
                colorType: 1,
              },
            ],
          },
        },
        h = {
          __sunlight: {
            color1: 16775668,
            color2: 16638126,
            beam: [
              {
                size: { w: 40, h: 2e3 },
                pos: {
                  x: -110,
                  y: -780,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
              {
                size: { w: 160, h: 2e3 },
                pos: {
                  x: -330,
                  y: -290,
                  z: 1550,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
              {
                size: { w: 100, h: 2e3 },
                pos: {
                  x: -420,
                  y: -430,
                  z: 1550,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
              {
                size: { w: 170, h: 2e3 },
                pos: {
                  x: -870,
                  y: -290,
                  z: 1520,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
              {
                size: { w: 180, h: 2e3 },
                pos: {
                  x: -750,
                  y: -730,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
              {
                size: { w: 40, h: 2e3 },
                pos: {
                  x: -680,
                  y: -470,
                  z: 1400,
                  rx: Math.PI / 2,
                  ry: 0,
                  rz: (-Math.PI / 2) * 0.1,
                },
                color: 16775668,
              },
            ],
          },
        },
        n = {
          __chara: {
            chara: [
              {
                imgPath: "/misatoto/assets/home/kagura_body.png",
                parts: [
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/kagura_body.png",
                    size: { w: 240, h: 120 },
                    pos: { x: 0, y: -23, z: 0 },
                    degree: -1,
                    degreeX: 0.5,
                    degreeY: 0.5,
                    renderOrder: 50,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/kagura_hand_right.png",
                    size: { w: 48, h: 69 },
                    pos: { x: -39, y: 48, z: 1 },
                    degree: 0,
                    degreeX: 5,
                    degreeY: 0,
                    renderOrder: 51,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/kagura_hand_left.png",
                    size: { w: 17, h: 38 },
                    pos: { x: 109, y: 26, z: 1 },
                    degree: Math.PI,
                    degreeX: 5,
                    degreeY: 0,
                    renderOrder: 51,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/kagura_dragon.png",
                    size: { w: 113, h: 74 },
                    pos: { x: -64, y: -1, z: 2 },
                    degree: 1,
                    degreeX: 0.5,
                    degreeY: 1,
                    renderOrder: 52,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/kagura_head.png",
                    size: { w: 76, h: 106 },
                    pos: { x: 33, y: 7, z: 3 },
                    degree: 0,
                    degreeX: 2,
                    degreeY: 0.5,
                    renderOrder: 53,
                  },
                ],
                size: { w: 240, h: 240 },
                pos: { x: 0, y: -250, z: 50 },
                renderOrder: 50,
              },
              {
                imgPath: "/misatoto/assets/home/ayu_body.png",
                parts: [
                  {
                    type: "stop",
                    img: "/misatoto/assets/home/ayu_body.png",
                    size: { w: 180, h: 180 },
                    pos: { x: 0, y: 0, z: 0 },
                    renderOrder: 50,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/ayu_fish.png",
                    size: { w: 76, h: 23 },
                    pos: { x: 43, y: -37, z: 1 },
                    degree: -1,
                    degreeX: 1.25,
                    degreeY: 0.25,
                    renderOrder: 51,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/ayu_head.png",
                    size: { w: 16, h: 21 },
                    pos: { x: -24, y: 22, z: 1 },
                    degree: 1,
                    degreeX: 0.5,
                    degreeY: 1,
                    renderOrder: 51,
                  },
                ],
                size: { w: 180, h: 180 },
                pos: { x: 205, y: -60, z: 50 },
                renderOrder: 50,
              },
              {
                imgPath: "/misatoto/assets/home/yamakujira_body.png",
                parts: [
                  {
                    type: "stop",
                    img: "/misatoto/assets/home/yamakujira_body.png",
                    size: { w: 180, h: 180 },
                    pos: { x: 0, y: 0, z: 0 },
                    renderOrder: 50,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/yamakujira_canning.png",
                    size: { w: 151, h: 103 },
                    pos: { x: 2, y: -5, z: 1 },
                    degree: 0,
                    degreeX: 0.5,
                    degreeY: 2,
                    renderOrder: 51,
                  },
                ],
                size: { w: 180, h: 180 },
                pos: { x: -85, y: -1, z: 50 },
                renderOrder: 50,
              },
              {
                imgPath: "/misatoto/assets/home/fujiya_body.png",
                parts: [
                  {
                    type: "stop",
                    img: "/misatoto/assets/home/fujiya_body.png",
                    size: { w: 180, h: 180 },
                    pos: { x: 0, y: 0, z: 0 },
                    renderOrder: -400,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/fujiya_head.png",
                    size: { w: 90, h: 39 },
                    pos: { x: 34, y: 18, z: 1 },
                    degree: 0,
                    degreeX: 0.5,
                    degreeY: 2,
                    renderOrder: -400,
                  },
                ],
                size: { w: 180, h: 180 },
                pos: { x: -140, y: 118, z: -800 },
                renderOrder: -400,
              },
              {
                imgPath: "/misatoto/assets/home/hanadastore_shop.png",
                parts: [
                  {
                    type: "stop",
                    img: "/misatoto/assets/home/hanadastore_shop.png",
                    size: { w: 180, h: 180 },
                    pos: { x: 0, y: 0, z: 0 },
                    renderOrder: -1200,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/hanadastore_lunch.png",
                    size: { w: 29, h: 23 },
                    pos: { x: 12, y: -51, z: 1 },
                    degree: 0,
                    degreeX: 1,
                    degreeY: 0.5,
                    renderOrder: -1199,
                  },
                  {
                    type: "rotate",
                    img: "/misatoto/assets/home/hanadastore_clock_hour.png",
                    size: { w: 1.7578125, h: 19.3359375 },
                    pos: { x: 28.5, y: -22, z: 1.1 },
                    degree: 1,
                    deltaDegree: 5e-4,
                    renderOrder: -1198,
                  },
                  {
                    type: "rotate",
                    img: "/misatoto/assets/home/hanadastore_clock_minute.png",
                    size: { w: 1.7578125, h: 19.3359375 },
                    pos: { x: 28.5, y: -22, z: 1.2 },
                    degree: 1.5,
                    deltaDegree: 0.001,
                    renderOrder: -1197,
                  },
                  {
                    type: "rotate",
                    img: "/misatoto/assets/home/hanadastore_clock_second.png",
                    size: { w: 1.7578125, h: 19.3359375 },
                    pos: { x: 28.5, y: -22, z: 1.3 },
                    degree: 0,
                    deltaDegree: 0.01,
                    renderOrder: -1196,
                  },
                ],
                size: { w: 180, h: 180 },
                pos: { x: 196, y: 150, z: -1200 },
                renderOrder: -1200,
              },
              {
                imgPath: "/misatoto/assets/home/aozorafield_body.png",
                parts: [
                  {
                    type: "stop",
                    img: "/misatoto/assets/home/aozorafield_body.png",
                    size: { w: 180, h: 180 },
                    pos: { x: 0, y: 0, z: 0 },
                    renderOrder: 50,
                  },
                  {
                    type: "fluctuate",
                    img: "/misatoto/assets/home/aozorafield_head.png",
                    size: { w: 108, h: 70 },
                    pos: { x: -36, y: -55, z: 1 },
                    degree: 0,
                    degreeX: 0.5,
                    degreeY: 2,
                    renderOrder: 51,
                  },
                ],
                size: { w: 180, h: 180 },
                pos: { x: -250, y: 228, z: 50 },
                renderOrder: 50,
              },
            ],
          },
        },
        l = Object.assign(
          {},
          r,
          i,
          a,
          h,
          n,
          {
            __subChara: {
              textures: {
                fujiya_all: "/misatoto/assets/home/fujiya_all.png",
                hanadastore_all: "/misatoto/assets/home/hanadastore_all.png",
                mayor: "/misatoto/assets/home/mayor.png",
                misabo: "/misatoto/assets/home/misabo.png",
                boars: "/misatoto/assets/home/boars.png",
                canoe: "/misatoto/assets/home/canoe.png",
                house_2: "/misatoto/assets/home/house_2.png",
                house_3: "/misatoto/assets/home/house_3.png",
              },
              subChara: [
                {
                  texture: "fujiya_all",
                  size: { w: 160, h: 160 },
                  pos: { x: 105, y: 180, z: 49 },
                  renderOrder: 49,
                },
                {
                  texture: "hanadastore_all",
                  size: { w: 160, h: 160 },
                  pos: { x: 270, y: 120, z: 49 },
                  renderOrder: 49,
                },
                {
                  texture: "mayor",
                  size: { w: 160, h: 160 },
                  pos: { x: -114, y: 316, z: 49 },
                  renderOrder: 49,
                },
                {
                  texture: "misabo",
                  size: { w: 120, h: 120 },
                  pos: { x: -40, y: 300, z: 48 },
                  renderOrder: 48,
                },
                {
                  texture: "boars",
                  size: { w: 160, h: 160 },
                  pos: { x: -250, y: -145, z: 48 },
                  renderOrder: 48,
                },
                {
                  texture: "canoe",
                  size: { w: 160, h: 160 },
                  pos: { x: 90, y: 292, z: 48 },
                  renderOrder: 48,
                },
                {
                  texture: "house_2",
                  size: { w: 39, h: 39 },
                  pos: { x: -166, y: 128.6, z: 0 },
                  renderOrder: 1,
                },
                {
                  texture: "house_3",
                  size: { w: 32, h: 32 },
                  pos: { x: -109, y: 159, z: 0 },
                  renderOrder: 1,
                },
              ],
            },
          },
          {
            __town: {
              textures: {
                house_1: "/misatoto/assets/home/house_1.png",
                tree_1: "/misatoto/assets/home/tree_1.png",
                tree_2: "/misatoto/assets/home/tree_2.png",
                mayor: "/misatoto/assets/home/mayor.png",
                misabo: "/misatoto/assets/home/misabo-stand.png",
              },
              town: [
                {
                  texture: "house_1",
                  parts: {
                    body: {
                      size: { w: 300, h: 300 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -400,
                    },
                  },
                  size: { w: 300, h: 300 },
                  pos: { x: 0, y: 112, z: -400 },
                  renderOrder: -400,
                },
                {
                  texture: "house_1",
                  parts: {
                    body: {
                      size: { w: 300, h: 300 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -800,
                    },
                  },
                  size: { w: 300, h: 300 },
                  pos: { x: -400, y: 155, z: -800 },
                  renderOrder: -800,
                },
                {
                  texture: "house_1",
                  parts: {
                    body: {
                      size: { w: 300, h: 300 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1600,
                    },
                  },
                  size: { w: 300, h: 300 },
                  pos: { x: -1200, y: 190, z: -1600 },
                  renderOrder: -1600,
                },
                {
                  texture: "house_1",
                  parts: {
                    body: {
                      size: { w: 300, h: 300 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1600,
                    },
                  },
                  size: { w: 300, h: 300 },
                  pos: { x: 480, y: 190, z: -1600 },
                  renderOrder: -1600,
                },
                {
                  texture: "house_1",
                  parts: {
                    body: {
                      size: { w: 300, h: 300 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1e3,
                    },
                  },
                  size: { w: 300, h: 300 },
                  pos: { x: 580, y: 190, z: -1e3 },
                  renderOrder: -1e3,
                },
                {
                  texture: "mayor",
                  parts: {
                    body: {
                      size: { w: 160, h: 160 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -400,
                    },
                  },
                  size: { w: 160, h: 160 },
                  pos: { x: -220, y: 50, z: -400 },
                  renderOrder: -400,
                },
                {
                  texture: "misabo",
                  parts: {
                    body: {
                      size: { w: 150, h: 150 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -900,
                    },
                  },
                  size: { w: 150, h: 150 },
                  pos: { x: 125, y: 90, z: -850 },
                  renderOrder: -900,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 90, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -800,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: 20, y: 115, z: -800 },
                  renderOrder: -800,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 90, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1320,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: 130, y: 150, z: -1320 },
                  renderOrder: -1320,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 81, h: 162 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1321,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: 80, y: 142, z: -1321 },
                  renderOrder: -1321,
                },
                {
                  texture: "tree_2",
                  parts: {
                    body: {
                      size: { w: 60, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1320,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: -20, y: 150, z: -1320 },
                  renderOrder: -1320,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 90, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1500,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: 680, y: 150, z: -1500 },
                  renderOrder: -1500,
                },
                {
                  texture: "tree_2",
                  parts: {
                    body: {
                      size: { w: 60, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1500,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: 760, y: 150, z: -1500 },
                  renderOrder: -1500,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 90, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1400,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: -950, y: 150, z: -1400 },
                  renderOrder: -1400,
                },
                {
                  texture: "tree_2",
                  parts: {
                    body: {
                      size: { w: 60, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1400,
                    },
                  },
                  size: { w: 60, h: 180 },
                  pos: { x: -450, y: 150, z: -1400 },
                  renderOrder: -1400,
                },
                {
                  texture: "tree_1",
                  parts: {
                    body: {
                      size: { w: 90, h: 180 },
                      pos: { x: 0, y: 0, z: 1 },
                      renderOrder: -1400,
                    },
                  },
                  size: { w: 90, h: 180 },
                  pos: { x: -530, y: 150, z: -1400 },
                  renderOrder: -1400,
                },
              ],
            },
          }
        );
      var d = s(189);
      s(255);
      class u {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (this.options = Object.assign(
            { changeClouds: function () {}, showSunlight: function () {} },
            e
          )),
            (this.updateTL = this.updateTL.bind(this)),
            (this.countMax = r.countMax),
            (this.counter = { var: 0 }),
            (this.scrollTop = 0),
            (this.isShowLogo = !1),
            (this.isShowSunlight = !0),
            (this.isHideButton = !1),
            (this.headerLogo = document.getElementsByClassName(
              "SiteHeader__logo"
            )[0]),
            (this.scrollButton = document.getElementsByClassName(
              "HomeContents__scrollButton"
            )[0]),
            (this.tl = new d.a({ paused: !0, onUpdate: this.updateTL })),
            this.addTimeLine();
        }
        addTimeLine() {
          const e = 1 / (r.pointLength - 1);
          let t = 0;
          (t += 2 * e),
            this.tl.add(
              TweenLite.to(this.counter, 3, {
                var: t,
                onUpdate: () => {
                  this.showLogo(this.counter.var),
                    this.options.showSunlight(this.counter.var);
                },
                ease: Power0.easeNone,
              })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1, { var: t, ease: Power0.easeNone })
            ),
            (t += 1 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, { var: t, ease: Power0.easeNone })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 1 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, { var: t, ease: Power0.easeNone })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 1 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, { var: t, ease: Power0.easeNone })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 2 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, { var: t, ease: Power0.easeNone })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 1 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, {
                var: t,
                ease: Power0.easeNone,
                onUpdate: () => {
                  this.options.changeClouds(this.counter.var);
                },
              })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 3 * e),
            this.tl.add(
              TweenLite.to(this.counter, 2.5, { var: t, ease: Power0.easeNone })
            ),
            this.tl.add(
              TweenLite.to(this.counter, 1.5, { var: t, ease: Power0.easeNone })
            ),
            (t += 3 * e),
            this.tl.add(
              TweenLite.to(this.counter, 3, {
                var: t,
                ease: Power0.easeNone,
                onUpdate: () => {
                  this.hideButton(this.counter.var);
                },
              })
            );
        }
        progress(e) {
          this.tl.progress(e);
        }
        updateTL() {
          let e = this.counter.var;
          this.counter.var < 0 && (e = 0),
            (this.scrollTop = Math.floor(e * this.countMax)),
            this.scrollTop > this.countMax && (this.scrollTop = this.countMax),
            this.scrollTop < 0 && (this.scrollTop = 0);
        }
        getScrollTop() {
          return this.scrollTop;
        }
        showLogo(e) {
          e < 0.04
            ? this.isShowLogo &&
              ((this.isShowLogo = !1), this.headerLogo.classList.add("is-hide"))
            : this.isShowLogo ||
              ((this.isShowLogo = !0),
              this.headerLogo.classList.remove("is-hide"));
        }
        hideButton(e) {
          e < 0.88
            ? this.isHideButton &&
              ((this.isHideButton = !1),
              this.scrollButton.classList.remove("is-hide"))
            : this.isHideButton ||
              ((this.isHideButton = !0),
              this.scrollButton.classList.add("is-hide"));
        }
      }
      const c = s(206),
        p = s(207);
      class m {
        constructor() {
          (this.isDev = !1),
            (this.isFirst = !0),
            (this.isFirstScroll = !0),
            (this.isCloudColor = !1),
            (this.isSunlight = !0),
            (this.resize = this.resize.bind(this)),
            (this.scroll = this.scroll.bind(this)),
            (this.changeClouds = this.changeClouds.bind(this)),
            (this.showSunlight = this.showSunlight.bind(this)),
            (this.mqM = l.mq.medium),
            this.isDev &&
              ((this.stats = new c()),
              this.stats.showPanel(0),
              document.body.appendChild(this.stats.dom)),
            (this.windowW = window.innerWidth),
            (this.wrap = document.getElementById("map")),
            (this.canvas = document.getElementById("canvas-bg")),
            (this.wrap = document.getElementsByClassName("Map")[0]),
            (this.cameraPos = { x: 0, y: 0, z: 0 }),
            (this.count = 0),
            (this.countMax = l.countMax),
            (this.scrollTop = 0),
            (this.progress = 0),
            (this.ease = l.ease),
            (this.vertices = []),
            (this.isLoadedClouds = !1),
            (this.alphaClouds = 0.5),
            (this.charas = []),
            (this.beams = []);
          let e = {
            changeClouds: this.changeClouds,
            showSunlight: this.showSunlight,
          };
          this.timelineManager = new u(e);
        }
        start() {
          this.initThree(), this.initCamera(), this.initObject();
        }
        initThree() {
          this.renderer = new p.WebGLRenderer({
            antialias: !1,
            canvas: this.canvas,
            alpha: !0,
          });
          let e = window.devicePixelRatio || 1;
          (e = e > 1.5 ? 1.5 : e),
            this.renderer.setPixelRatio(e),
            this.renderer.setSize(
              this.wrap.clientWidth,
              this.wrap.clientHeight
            ),
            this.renderer || alert("Three.js の初期化に失敗"),
            (this.scene = new p.Scene());
          let t = [],
            s = [],
            r = [],
            o = [];
          for (var i = 0; i < l.__camera.pos.length; i++)
            t.push(new p.Vector2(l.__camera.pos[i].x, l.__camera.pos[i].y)),
              s.push(new p.Vector2(l.__camera.pos[i].z, 0)),
              r.push(new p.Vector2(l.__camera.pos[i].mobZ, 0)),
              o.push(new p.Vector2(l.__camera.pos[i].rx, 0));
          const a = new p.SplineCurve(t),
            h = new p.SplineCurve(s),
            n = new p.SplineCurve(r),
            d = new p.SplineCurve(o),
            u = a.getPoints(this.countMax - 1),
            c = h.getPoints(this.countMax - 1),
            m = n.getPoints(this.countMax - 1),
            z = d.getPoints(this.countMax - 1);
          for (let e = 0; e < u.length; e++) {
            let t = {},
              s = {},
              r = {};
            (s.x = u[e].x),
              (s.y = u[e].y),
              (s.z = c[e].x),
              (s.rx = z[e].x),
              (r.x = u[e].x),
              (r.y = u[e].y),
              (r.z = m[e].x),
              (r.rx = z[e].x),
              (t.pc = s),
              (t.mob = r),
              (this.vertices[e] = t);
          }
        }
        initCamera() {
          (this.camera = new p.PerspectiveCamera(
            45,
            this.wrap.clientWidth / this.wrap.clientHeight,
            1,
            3e3
          )),
            this.camera.position.set(0, 0, 1e3),
            this.camera.rotation.set(Math.PI / 2, 0, 0);
        }
        initObject() {
          if (
            (this.loadTexture(l.__cloud.textures, () => {
              (this.isLoadedClouds = !0),
                this.canvas.classList.add("is-loaded");
            }),
            this.setupCloud(),
            this.setupSunlight(),
            this.setupMap(),
            this.setupUnderground(),
            this.setupChara(),
            this.loadTexture(l.__subChara.textures, () => {}),
            this.setupSubChara(),
            this.loadTexture(l.__town.textures, () => {}),
            this.setupTown(),
            this.isDev)
          ) {
            var e = new p.AxisHelper(500);
            this.scene.add(e);
          }
          this.scene.fog = new p.Fog(15719371, 1600, 2200);
        }
        loadTexture(e, t) {
          const s = Object.keys(e).length;
          let r = 0;
          for (let o in e) {
            let i = e[o];
            e[o] = new p.TextureLoader().load(i, (e) => {
              (e.minFilter = p.LinearFilter), ++r == s && t();
            });
          }
        }
        setupCloud() {
          for (var e = 0; e < l.__cloud.cloud.length; e++) {
            const t = l.__cloud.textures[l.__cloud.cloud[e].texture],
              s = new p.PlaneBufferGeometry(
                l.__cloud.cloud[e].size.w,
                l.__cloud.cloud[e].size.h,
                1
              ),
              r = new p.MeshBasicMaterial({
                map: t,
                transparent: !0,
                alphaTest: this.alphaClouds,
              }),
              o = new p.Mesh(s, r);
            o.position.set(
              l.__cloud.cloud[e].pos.x,
              l.__cloud.cloud[e].pos.y,
              l.__cloud.cloud[e].pos.z
            ),
              o.rotation.set(
                l.__cloud.cloud[e].pos.rx,
                l.__cloud.cloud[e].pos.ry,
                l.__cloud.cloud[e].pos.rz
              ),
              (l.__cloud.cloud[e].mesh = o),
              (l.__cloud.cloud[e].material = r),
              this.scene.add(o);
          }
        }
        setupUnderground() {
          const e = new p.PlaneGeometry(l.under.size.w, l.under.size.h, 1),
            t = new p.MeshBasicMaterial({
              color: l.under.color,
              side: p.DoubleSide,
            }),
            s = new p.Mesh(e, t);
          s.position.set(l.under.pos.x, l.under.pos.y, l.under.pos.z),
            this.scene.add(s);
        }
        setupGround() {
          const e = new p.RingGeometry(
              l.ground.size.inR,
              l.ground.size.outR,
              l.ground.size.seg
            ),
            t = new p.MeshBasicMaterial({
              color: l.ground.color,
              side: p.DoubleSide,
            }),
            s = new p.Mesh(e, t);
          (s.renderOrder = l.ground.renderOrder),
            s.position.set(l.ground.pos.x, l.ground.pos.y, l.ground.pos.z),
            this.scene.add(s);
        }
        setupMap() {
          const e = new p.TextureLoader().load(
            l.map[0].imgPath,
            (e) => {
              this.setupGround();
            },
            void 0,
            (e) => {
              this.setupGround();
            }
          );
          e.minFilter = p.LinearFilter;
          const t = new p.PlaneBufferGeometry(
              l.map[0].size.w,
              l.map[0].size.h,
              1
            ),
            s = new p.MeshBasicMaterial({ map: e, transparent: !0 }),
            r = new p.Mesh(t, s);
          (r.renderOrder = l.map.renderOrder),
            r.position.set(l.map[0].pos.x, l.map[0].pos.y, l.map[0].pos.z),
            this.scene.add(r);
        }
        setupChara() {
          for (var e = 0; e < l.__chara.chara.length; e++) {
            const s = l.__chara.chara[e].parts.length,
              r = new p.Group();
            for (var t = 0; t < s; t++) {
              let s, o, i, a;
              const h = l.__chara.chara[e].parts[t].type;
              ((s = new p.TextureLoader().load(
                l.__chara.chara[e].parts[t].img
              )).magFilter = p.LinearFilter),
                (s.minFilter = p.LinearFilter),
                (o = new p.PlaneBufferGeometry(
                  l.__chara.chara[e].parts[t].size.w,
                  l.__chara.chara[e].parts[t].size.h,
                  1
                )),
                (i = new p.MeshBasicMaterial({ map: s, transparent: !0 })),
                ((a = new p.Mesh(o, i)).name = h),
                (a.renderOrder = l.__chara.chara[e].parts[t].renderOrder),
                a.position.set(
                  l.__chara.chara[e].parts[t].pos.x,
                  l.__chara.chara[e].parts[t].pos.y,
                  l.__chara.chara[e].parts[t].pos.z
                ),
                r.add(a);
            }
            (r.renderOrder = l.__chara.chara[e].renderOrder),
              r.position.set(
                l.__chara.chara[e].pos.x,
                l.__chara.chara[e].pos.y,
                l.__chara.chara[e].pos.z
              ),
              (this.charas[e] = r),
              this.scene.add(r);
          }
        }
        setupSubChara() {
          for (var e = 0; e < l.__subChara.subChara.length; e++) {
            const t = l.__subChara.textures[l.__subChara.subChara[e].texture],
              s = new p.PlaneBufferGeometry(
                l.__subChara.subChara[e].size.w,
                l.__subChara.subChara[e].size.h,
                1
              ),
              r = new p.MeshBasicMaterial({ map: t, transparent: !0 }),
              o = new p.Mesh(s, r);
            (o.renderOrder = l.__subChara.subChara[e].renderOrder),
              o.position.set(
                l.__subChara.subChara[e].pos.x,
                l.__subChara.subChara[e].pos.y,
                l.__subChara.subChara[e].pos.z
              ),
              this.scene.add(o);
          }
        }
        setupTown() {
          for (var e = 0; e < l.__town.town.length; e++) {
            const t = new p.Group(),
              s = l.__town.textures[l.__town.town[e].texture],
              r = new p.PlaneBufferGeometry(
                l.__town.town[e].parts.body.size.w,
                l.__town.town[e].parts.body.size.h,
                1
              ),
              o = new p.MeshBasicMaterial({ map: s, transparent: !0 }),
              i = new p.Mesh(r, o);
            i.position.set(
              l.__town.town[e].parts.body.pos.x,
              l.__town.town[e].parts.body.pos.y,
              l.__town.town[e].parts.body.pos.z
            ),
              t.add(i),
              (t.renderOrder = l.__town.town[e].renderOrder),
              t.position.set(
                l.__town.town[e].pos.x,
                l.__town.town[e].pos.y,
                l.__town.town[e].pos.z
              ),
              this.scene.add(t);
          }
        }
        setupSunlight() {
          for (var e = 0; e < l.__sunlight.beam.length; e++) {
            const t = new p.PlaneGeometry(
                l.__sunlight.beam[e].size.w,
                l.__sunlight.beam[e].size.h,
                1
              ),
              s = new p.MeshBasicMaterial({
                color: l.__sunlight.color1,
                side: p.DoubleSide,
              }),
              r = new p.Mesh(t, s);
            r.position.set(
              l.__sunlight.beam[e].pos.x,
              l.__sunlight.beam[e].pos.y,
              l.__sunlight.beam[e].pos.z
            ),
              r.rotation.set(
                l.__sunlight.beam[e].pos.rx,
                l.__sunlight.beam[e].pos.ry,
                l.__sunlight.beam[e].pos.rz
              ),
              (this.beams[e] = r),
              this.scene.add(r);
          }
        }
        changeClouds(e) {
          if (e < 0.55) {
            if (this.isCloudColor) {
              (this.isCloudColor = !1),
                this.wrap.classList.remove("is-evening");
              for (let e = 0; e < l.__cloud.cloud.length; e++)
                l.__cloud.cloud[e].mesh.material.color.setHex(16777215);
              for (let e = 0; e < this.beams.length; e++)
                this.beams[e].position.z = l.__sunlight.beam[e].pos.z;
              this.scene.fog.color.setHex(15719371);
            }
          } else if (!this.isCloudColor) {
            (this.isCloudColor = !0), this.wrap.classList.add("is-evening");
            for (let e = 0; e < l.__cloud.cloud.length; e++) {
              let t = 2 == l.__cloud.cloud[e].colorType ? 16711581 : 16637601;
              l.__cloud.cloud[e].mesh.material.color.setHex(t);
            }
            for (let e = 0; e < this.beams.length; e++)
              this.beams[e].position.z = l.__sunlight.beam[e].pos.z + 1e4;
            this.scene.fog.color.setHex(16708567);
          }
        }
        showSunlight(e) {
          if (e < 0.1) {
            let t = 10 * e,
              s = 1 - 10 * e;
            for (let e = 0; e < this.beams.length; e++) {
              let r = e % 2 == 0 ? t : s;
              r < 1e-4 && (r = 1e-4), (this.beams[e].scale.x = r);
            }
          }
        }
        getScrollTop() {
          this.scrollTop = this.timelineManager.getScrollTop();
        }
        scroll(e) {
          let t = e;
          t < 0 && (t = 0);
          let s = t / (document.body.offsetHeight - window.innerHeight);
          this.timelineManager.progress(s);
        }
        render() {
          this.isDev && this.stats.begin();
          for (let t = 0; t < this.charas.length; t++) {
            const s = this.charas[t].children.length;
            for (var e = 0; e < s; e++) {
              const s = this.charas[t].children[e];
              if ("fluctuate" == s.name) {
                l.__chara.chara[t].parts[e].degree += 0.025;
                let r = l.__chara.chara[t].parts[e].degree,
                  o =
                    l.__chara.chara[t].parts[e].degreeX * Math.cos(r) +
                    l.__chara.chara[t].parts[e].pos.x,
                  i =
                    l.__chara.chara[t].parts[e].degreeY * Math.sin(r) +
                    l.__chara.chara[t].parts[e].pos.y;
                (s.position.x = o), (s.position.y = i);
              } else if ("rotate" == s.name) {
                l.__chara.chara[t].parts[e].degree +=
                  l.__chara.chara[t].parts[e].deltaDegree;
                let r = l.__chara.chara[t].parts[e].degree;
                s.rotation.z = (-Math.PI / 2) * r;
              }
            }
          }
          this.getScrollTop(),
            this.isFirst &&
              ((this.isFirst = !1), (this.progress = this.scrollTop)),
            (this.progress += (this.scrollTop - this.progress) * this.ease);
          let t = Math.floor(this.progress);
          t >= this.countMax && (t = this.countMax - 1),
            this.windowW < this.mqM
              ? ((this.camera.position.x = this.vertices[t].mob.x),
                (this.camera.position.y = this.vertices[t].mob.y),
                (this.camera.position.z = this.vertices[t].mob.z))
              : ((this.camera.position.x = this.vertices[t].pc.x),
                (this.camera.position.y = this.vertices[t].pc.y),
                (this.camera.position.z = this.vertices[t].pc.z)),
            (this.camera.rotation.x = this.vertices[t].pc.rx),
            this.renderer.render(this.scene, this.camera),
            this.isDev && this.stats.end();
        }
        resize() {
          (this.windowW = window.innerWidth),
            (this.canvas.width = this.wrap.clientWidth),
            (this.canvas.height = this.wrap.clientHeight),
            (this.camera.aspect =
              this.wrap.clientWidth / this.wrap.clientHeight),
            this.camera.updateProjectionMatrix(),
            this.renderer.setSize(
              this.wrap.clientWidth,
              this.wrap.clientHeight
            );
        }
      }
      var z = s(257),
        g = s(205),
        y = s(208),
        _ = s.n(y),
        x = s(232),
        w = s.n(x),
        b = s(237),
        f = s.n(b);
      class M {
        constructor(e) {
          (this.resize = this.resize.bind(this)),
            (this.throttled = this.throttled.bind(this)),
            (this.scrollHandle = w()(this.throttled, 33)),
            (this.resizeHandle = this.resize),
            (this.scrollTarget = window),
            (this.target = e);
        }
        throttled() {
          this.scrollCheck();
        }
        scrollCheck() {
          let e =
              1 -
              f()(this.target, {
                position: 0.9,
                showOnly: !0,
                verticalOnly: !0,
              }) -
              0.1,
            t = e <= 0 ? 0 : e <= 0.2 ? 5 * e : 1;
          this.target.style.opacity = t;
        }
        scroll() {
          this.scrollHandle();
        }
        resize() {
          this.throttled();
        }
      }
      class T {
        constructor() {
          (this.scroll = this.scroll.bind(this)),
            (this.resize = this.resize.bind(this)),
            (this.targetAry = []),
            (this.targets = document.getElementsByClassName("js-parallaxItem")),
            _()(this.targets, (e, t) => {
              this.targetAry.push(new M(e));
            }),
            this.resize();
        }
        scroll() {
          for (var e = 0; e < this.targetAry.length; e++)
            this.targetAry[e].scroll();
        }
        resize() {
          for (var e = 0; e < this.targetAry.length; e++)
            this.targetAry[e].resize();
        }
      }
      s.d(t, "default", function () {
        return O;
      }),
        s.d(t, "HomePage", function () {
          return P;
        }),
        new z.a();
      class O {
        constructor() {
          (this.loop = this.loop.bind(this)),
            (this.resize = this.resize.bind(this)),
            (this.scroll = this.scroll.bind(this)),
            (document.documentElement.style.background = "#efdbcb"),
            (document.body.style.background = "#efdbcb"),
            (this.scrollShowManager = new T()),
            (this.webglManager = new m()),
            this.animateID,
            (this.rafLoop = !1),
            (this.logo = document.querySelector(".HomeStoryHeader__logo")),
            (this.sceneDom = document.getElementsByClassName("js-scene")),
            (this.scenes = []),
            (this.sceneID = 0),
            (this.currentID = 0),
            (this.offsetTops = []),
            (this.windowH = window.innerHeight);
          for (let e = 0; e < this.sceneDom.length; e++)
            this.scenes.push(this.sceneDom[e]);
        }
        start() {
          this.getOffsetTop(),
            this.webglManager.start(),
            this.eventAttach(),
            this.startRaf(),
            this.showLogo();
        }
        showLogo() {
          this.logo.classList.add("is-show");
        }
        eventAttach() {
          window.addEventListener("resize", this.resize),
            this.resize(),
            window.addEventListener("scroll", this.scroll),
            this.scroll(),
            this.setupBtnScroll();
        }
        loop() {
          this.webglManager.render(),
            (this.animateID = requestAnimationFrame(this.loop));
        }
        startRaf() {
          this.rafLoop ||
            ((this.rafLoop = !0),
            (this.animateID = requestAnimationFrame(this.loop)));
        }
        stopRaf() {
          (this.rafLoop = !1), cancelAnimationFrame(this.animateID);
        }
        resize() {
          (this.windowH = window.innerHeight),
            this.webglManager.resize(),
            this.getOffsetTop(),
            this.scrollShowManager.resize();
        }
        scroll() {
          let e = window.pageYOffset || document.documentElement.scrollTop;
          (e = e < 0 ? 0 : e),
            this.scrollCheck(e),
            this.webglManager.scroll(e),
            this.scrollShowManager.scroll();
        }
        scrollCheck(e) {
          for (let t = 0; t < this.offsetTops.length; t++)
            if (e <= this.offsetTops[t]) return void (this.currentID = t);
        }
        getOffsetTop() {
          this.offsetTops = [];
          let e = [];
          for (let t = 0; t < this.sceneDom.length; t++) {
            const s =
              this.sceneDom[t].getBoundingClientRect().top + window.pageYOffset;
            e.push(s);
          }
          for (var t = 0; t < e.length - 1; t++) {
            let s = e[t + 1] - 0.1 * this.windowH;
            this.offsetTops.push(s);
          }
          this.offsetTops.push(document.body.offsetHeight);
        }
        setupBtnScroll() {
          document
            .getElementsByClassName("HomeContents__scrollButton")[0]
            .addEventListener("click", (e) => {
              if (
                (e.preventDefault(), this.currentID >= this.sceneDom.length - 1)
              )
                return;
              const t = this.currentID + 1;
              var s = this.sceneDom[t].getBoundingClientRect(),
                r = window.pageYOffset + s.top;
              g.a.to(window, 1.8, {
                scrollTo: { y: r, autoKill: !1 },
                ease: Power3.easeInOut,
              });
            });
        }
      }
      const P = () => new O();
    },
    237: function (e, t, s) {
      "use strict";
      s(238);
      e.exports = function (e) {
        let t = e.getBoundingClientRect(),
          s = window.innerHeight || document.documentElement.clientHeight;
        if (0 == t.width) return;
        let r = t.top / s;
        return r < 0 ? 0 : r > 1 ? 1 : r;
      };
    },
  },
]);
