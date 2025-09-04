"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const layerCategories = {
  "FRA Rights": [
    { id: "ifr", name: "Individual Rights (IFR)", color: "#16a34a", count: "45,230", visible: true },
    { id: "cr", name: "Community Rights (CR)", color: "#3b82f6", count: "12,450", visible: true },
    { id: "cfr", name: "Community Forest Resource (CFR)", color: "#8b5cf6", count: "8,920", visible: true },
  ],
  "Asset Layers": [
    { id: "farms", name: "Agricultural Land", color: "#eab308", count: "2,340 km²", visible: false },
    { id: "forests", name: "Forest Cover", color: "#059669", count: "5,670 km²", visible: false },
    { id: "ponds", name: "Water Bodies", color: "#0ea5e9", count: "890", visible: false },
    { id: "streams", name: "Streams & Rivers", color: "#06b6d4", count: "1,230 km", visible: false },
  ],
  Administrative: [
    { id: "states", name: "State Boundaries", color: "#6b7280", count: "4", visible: true },
    { id: "districts", name: "District Boundaries", color: "#9ca3af", count: "123", visible: false },
    { id: "villages", name: "Village Boundaries", color: "#d1d5db", count: "3,450", visible: false },
  ],
}

export default function LayerControl({ onLayerToggle, activeLayers }) {
  const handleLayerToggle = (layerId, checked) => {
    onLayerToggle(layerId, checked)
  }

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Map Layers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(layerCategories).map(([category, layers]) => (
          <div key={category}>
            <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
            <div className="space-y-2">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={layer.id}
                    checked={activeLayers.includes(layer.id)}
                    onCheckedChange={(checked) => handleLayerToggle(layer.id, checked)}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                      <label htmlFor={layer.id} className="text-sm cursor-pointer">
                        {layer.name}
                      </label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {layer.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
