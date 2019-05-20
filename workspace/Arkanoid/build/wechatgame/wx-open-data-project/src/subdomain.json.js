module.exports = [
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,0"
  },
  [
    {
      "__type__": "cc.SceneAsset",
      "_name": "Test",
      "scene": {
        "__id__": 1
      },
      "asyncLoadAssets": null
    },
    {
      "__type__": "cc.Scene",
      "_name": "New Node",
      "_children": [
        {
          "__id__": 2
        },
        {
          "__id__": 7
        }
      ],
      "_active": false,
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 0.42762528330808425,
        "y": 0.42762528330808425,
        "z": 1
      },
      "autoReleaseAssets": false
    },
    {
      "__type__": "cc.Node",
      "_name": "Canvas",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        }
      ],
      "_level": 1,
      "_components": [
        {
          "__type__": "cc.Canvas",
          "node": {
            "__id__": 2
          },
          "_designResolution": {
            "__type__": "cc.Size",
            "width": 400,
            "height": 420
          },
          "_fitWidth": true
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 420
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 200,
        "y": 210
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      },
      "_id": "1f51fRKdx9KAZIFK6yiet28"
    },
    {
      "__type__": "cc.Node",
      "_name": "Main Camera",
      "_parent": {
        "__id__": 2
      },
      "_level": 1,
      "_components": [
        {
          "__type__": "cc.Camera",
          "node": {
            "__id__": 3
          },
          "_clearFlags": 7,
          "_backgroundColor": {
            "__type__": "cc.Color",
            "r": 255,
            "g": 255,
            "b": 255,
            "a": 0
          },
          "_depth": -1
        }
      ],
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "Display",
      "_parent": {
        "__id__": 2
      },
      "_children": [
        {
          "__id__": 5
        }
      ],
      "_components": [
        {
          "__type__": "cc.ScrollView",
          "node": {
            "__id__": 4
          },
          "horizontal": false,
          "brake": 0.9,
          "bounceDuration": 0.23,
          "_N$content": {
            "__id__": 6
          },
          "content": {
            "__id__": 6
          },
          "_N$horizontalScrollBar": null,
          "_N$verticalScrollBar": null
        },
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 4
          },
          "_alignFlags": 41,
          "_top": 2,
          "_originalWidth": 400
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 400
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": 8
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "View",
      "_parent": {
        "__id__": 4
      },
      "_children": [
        {
          "__id__": 6
        }
      ],
      "_components": [
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 5
          },
          "alignMode": 2,
          "_alignFlags": 45,
          "_originalWidth": 240,
          "_originalHeight": 250
        },
        {
          "__type__": "cc.Mask",
          "node": {
            "__id__": 5
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 400
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "Content",
      "_parent": {
        "__id__": 5
      },
      "_components": [
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 6
          },
          "alignMode": 2,
          "_alignFlags": 40,
          "_originalWidth": 300
        },
        {
          "__type__": "cc.Layout",
          "node": {
            "__id__": 6
          },
          "_layoutSize": {
            "__type__": "cc.Size",
            "width": 400,
            "height": 20
          },
          "_resize": 1,
          "_N$layoutType": 2,
          "_N$spacingY": 20
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 20
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 0.5,
        "y": 1
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": 208
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "launch",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 8
        }
      ],
      "_level": 1,
      "_components": [
        {
          "__type__": "e53e6YiUd9FJLf8yIQu1n47",
          "node": {
            "__id__": 7
          },
          "content": {
            "__id__": 6
          },
          "prefab": {
            "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
          },
          "userRankInfo": {
            "__id__": 8
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 420
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 200,
        "y": 210
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      },
      "_id": "980XNJvvRGVr+ruHYvaK6B"
    },
    {
      "__type__": "cc.Node",
      "_name": "userInfo",
      "_parent": {
        "__id__": 7
      },
      "_level": 2,
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 8
          },
          "_sizeMode": 0
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 400,
        "height": 40
      },
      "_position": {
        "__type__": "cc.Vec3",
        "y": -240
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    }
  ],
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,0"
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "default_sprite",
      "texture": "6eBWFz0oVHPLIGQKf/9Thu",
      "rect": [
        0,
        2,
        40,
        36
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        40,
        40
      ],
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "default_sprite_splash",
      "texture": "02delMVqdBD70a/HSD99FK",
      "rect": [
        0,
        0,
        2,
        2
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        2,
        2
      ],
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  },
  [
    {
      "__type__": "cc.Prefab",
      "_name": "block",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "block",
      "_children": [
        {
          "__id__": 2
        },
        {
          "__id__": 3
        },
        {
          "__id__": 5
        }
      ],
      "_level": 1,
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 1
          },
          "_spriteFrame": {
            "__uuid__": "a2MjXRFdtLlYQ5ouAFv/+R"
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
        },
        "fileId": "9cRtn0hFBAnb0+E2/DH1Io"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 350,
        "height": 60
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "userName",
      "_parent": {
        "__id__": 1
      },
      "_level": 2,
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 2
          },
          "_useOriginalSize": false,
          "_string": "Label",
          "_N$string": "Label",
          "_fontSize": 25,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
        },
        "fileId": "2fQcfaB6pAm5ImzuYnWBOS"
      },
      "_color": {
        "__type__": "cc.Color"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 61.17,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": -60
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "mask",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 4
        }
      ],
      "_level": 2,
      "_components": [
        {
          "__type__": "cc.Mask",
          "node": {
            "__id__": 3
          },
          "_type": 1,
          "_segments": 30
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
        },
        "fileId": "91zn2IjZRNIp0vvEycCyzg"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 60,
        "height": 60
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": -109
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "userIcon",
      "_parent": {
        "__id__": 3
      },
      "_level": 3,
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 4
          },
          "_spriteFrame": {
            "__uuid__": "8c20Sso/ZEn7NUfNSM+EBh"
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
        },
        "fileId": "fbrqZuJB9Pzp7JC3JQ32o4"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 60,
        "height": 60
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "score",
      "_parent": {
        "__id__": 1
      },
      "_level": 2,
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 5
          },
          "_useOriginalSize": false,
          "_string": "score",
          "_N$string": "score",
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "cbKQJzOAhKWJ7I15nI/uhl"
        },
        "fileId": "3bma22WntGkq9puclIYCBm"
      },
      "_color": {
        "__type__": "cc.Color",
        "r": 5
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 97.81,
        "height": 40
      },
      "_position": {
        "__type__": "cc.Vec3",
        "x": 95,
        "y": -1
      },
      "_scale": {
        "__type__": "cc.Vec3",
        "x": 1,
        "y": 1,
        "z": 1
      }
    }
  ]
];
