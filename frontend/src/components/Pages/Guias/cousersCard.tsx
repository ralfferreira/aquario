import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { FC, ReactNode } from "react";
import { Settings, Monitor, Brain } from "lucide-react";

interface CourseCardProps {
  iconName: string; 
  children: ReactNode;
}

const iconMap = {
  gear: Settings,
  monitor: Monitor,
  lightbulb: Brain,
};

const CourseCard: FC<CourseCardProps> = ({ iconName, children }) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];

  return (
    <Card className="h-auto dark:text-dark-text dark:border-white hover:border-gray-900 hover:cursor-pointer 
                     transform hover:scale-105 transition-all duration-300 hover:text-gray-900">
      <CardHeader>
        <Icon className="w-6 h-6" />
      </CardHeader>
      <CardContent className="mt-12">
        <CardTitle>{children}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default CourseCard;