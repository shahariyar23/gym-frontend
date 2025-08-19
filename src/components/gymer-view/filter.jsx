import { filterOptions, filterOptionsAccessories } from "@/config";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const CourseFilter = ({ filter, handelFilter, accessories }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-lg font-extrabold ">Filters</h1>
      </div>
      <div className="p-4 space-y-4">
        {accessories === true
          ? Object.keys(filterOptionsAccessories).map((keyItem) => (
              <Fragment key={keyItem}>
                <div>
                  <h3 className="text-base font-bold">{keyItem}</h3>
                </div>
                <div className="grid gap-2">
                  {filterOptionsAccessories[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex gap-2 items-center font-medium cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          filter &&
                          Object.keys(filter).length > 0 &&
                          filter[keyItem] &&
                          filter[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handelFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
                <Separator />
              </Fragment>
            ))
          : Object.keys(filterOptions).map((keyItem) => (
              <Fragment key={keyItem}>
                <div>
                  <h3 className="text-base font-bold">{keyItem}</h3>
                </div>
                <div className="grid gap-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex gap-2 items-center font-medium cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          filter &&
                          Object.keys(filter).length > 0 &&
                          filter[keyItem] &&
                          filter[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() => handelFilter(keyItem, option.id)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
                <Separator />
              </Fragment>
            ))}
      </div>
    </div>
  );
};

export default CourseFilter;
