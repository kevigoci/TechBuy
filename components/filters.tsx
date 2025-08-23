"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const platforms = [
  { id: "pc", label: "PC Enhanced", count: 2 },
  { id: "console", label: "Console", count: 2 },
]

const accountTypes = [
  { id: "money-boost", label: "Money Boost", count: 2 },
  { id: "modded", label: "Modded Account", count: 2 },
]

interface FiltersProps {
  onFiltersChange: (filters: {
    platforms: string[]
    accountTypes: string[]
    priceRange: [number, number]
  }) => void
}

export function Filters({ onFiltersChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([])

  const handlePlatformChange = (platformLabel: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...selectedPlatforms, platformLabel]
      : selectedPlatforms.filter((p) => p !== platformLabel)

    setSelectedPlatforms(newPlatforms)
    onFiltersChange({
      platforms: newPlatforms,
      accountTypes: selectedAccountTypes,
      priceRange,
    })
  }

  const handleAccountTypeChange = (typeLabel: string, checked: boolean) => {
    const newAccountTypes = checked
      ? [...selectedAccountTypes, typeLabel]
      : selectedAccountTypes.filter((t) => t !== typeLabel)

    setSelectedAccountTypes(newAccountTypes)
    onFiltersChange({
      platforms: selectedPlatforms,
      accountTypes: newAccountTypes,
      priceRange,
    })
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange)
    onFiltersChange({
      platforms: selectedPlatforms,
      accountTypes: selectedAccountTypes,
      priceRange: newRange,
    })
  }

  const clearAllFilters = () => {
    setSelectedPlatforms([])
    setSelectedAccountTypes([])
    setPriceRange([0, 150])
    onFiltersChange({
      platforms: [],
      accountTypes: [],
      priceRange: [0, 150],
    })
  }

  const allSelectedFilters = [...selectedPlatforms, ...selectedAccountTypes]

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {allSelectedFilters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allSelectedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => {
                      if (selectedPlatforms.includes(filter)) {
                        handlePlatformChange(filter, false)
                      } else {
                        handleAccountTypeChange(filter, false)
                      }
                    }}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Platform</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.label)}
                  onCheckedChange={(checked) => handlePlatformChange(platform.label, !!checked)}
                />
                <Label htmlFor={platform.id} className="text-sm cursor-pointer">
                  {platform.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({platform.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Account Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {accountTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedAccountTypes.includes(type.label)}
                  onCheckedChange={(checked) => handleAccountTypeChange(type.label, !!checked)}
                />
                <Label htmlFor={type.id} className="text-sm cursor-pointer">
                  {type.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({type.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
              max={150}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
              className="text-xs"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange([priceRange[0], Number.parseInt(e.target.value) || 150])}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
        Clear All Filters
      </Button>
    </div>
  )
}
