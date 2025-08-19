import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonFrom = ({
  fromControls,
  fromData,
  setFromData,
  onSubmit,
  buttonText,
  isButtonDisable,
}) => {
  const renderInputBycomponentType = (getComponetType) => {
    let element = null;
    const value = fromData[getComponetType.name];

    switch (getComponetType.componentType) {
      case "input":
        element = (
          <Input
            name={getComponetType.name}
            placeholder={getComponetType.placeholder}
            type={getComponetType.type}
            id={getComponetType.name}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getComponetType.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFromData({
                ...fromData,
                [getComponetType.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getComponetType.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getComponetType.options && getComponetType.options.length > 0
                ? getComponetType.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.label}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getComponetType.name}
            placeholder={getComponetType.placeholder}
            id={getComponetType.id}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getComponetType.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getComponetType.name}
            placeholder={getComponetType.placeholder}
            type={getComponetType.type}
            id={getComponetType.name}
            value={value}
            onChange={(e) =>
              setFromData({
                ...fromData,
                [getComponetType.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 mx-1">
        {fromControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputBycomponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isButtonDisable} type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonFrom;
