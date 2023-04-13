import { H3 } from "@/components/ui/h3";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { StatCard } from "@/components/ui/statCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const MacroCalc = () => {
    const [system, setSystem] = useState<"imperial" | "metric">("imperial");
    const [sex, setSex] = useState<"male" | "female">("male");
    const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("lose");
    const [age, setAge] = useState(18);
    const [imperialHeight, setImperialHeight] = useState(66);
    const [metricHeight, setMetricHeight] = useState(168);
    const [imperialWeight, setImperialWeight] = useState(150);
    const [metricWeight, setMetricWeight] = useState(68);
    const [activityLevel, setActivityLevel] = useState<"sedentary" | "moderate" | "active">("sedentary");
    const [protein, setProtein] = useState<"low" | "medium" | "high">("low");

    const ree = () => {
        if (sex === "male") {
            if (system === "imperial") {
                return 66 + 6.23 * imperialWeight + 12.7 * imperialHeight - 6.8 * age;
            } else {
                return 66 + 13.7 * metricWeight + 5 * metricHeight - 6.8 * age;
            }
        }

        if (sex == "female") {
            if (system === "imperial") {
                return 655 + 4.35 * imperialWeight + 4.7 * imperialHeight - 4.7 * age;
            } else {
                return 655 + 9.6 * metricWeight + 1.8 * metricHeight - 4.7 * age;
            }
        }

        return 0;
    };

    const tdee = () => {
        if (activityLevel === "sedentary") {
            return ree() * 1.2;
        }

        if (activityLevel === "moderate") {
            return ree() * 1.375;
        }

        if (activityLevel === "active") {
            return ree() * 1.55;
        }

        return 0;
    };

    const onGoalChange = (e: string) => {
        e === "lose" && setGoal("lose");
        e === "maintain" && setGoal("maintain");
        e === "gain" && setGoal("gain");
    };

    const onActivityLevelChange = (e: string) => {
        e === "sedentary" && setActivityLevel("sedentary");
        e === "moderate" && setActivityLevel("moderate");
        e === "active" && setActivityLevel("active");
    };

    const onProteinChange = (e: string) => {
        e === "low" && setProtein("low");
        e === "medium" && setProtein("medium");
        e === "high" && setProtein("high");
    };

    return (
        <div className="lg:grid lg:grid-cols-3">
            <div className="col-span-2 pt-8">
                <H3>Calculate your Macros</H3>
                <form className="p-4 flex flex-col gap-8">
                    <div>
                        <Label>System</Label>
                        <Tabs value={system} onValueChange={e => (e === "imperial" ? setSystem("imperial") : setSystem("metric"))}>
                            <TabsList>
                                <TabsTrigger value="imperial">Imperial</TabsTrigger>
                                <TabsTrigger value="metric">Metric</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div>
                        <Label>Sex Assigned at Birth</Label>
                        <Tabs value={sex} onValueChange={e => (e === "male" ? setSex("male") : setSex("female"))}>
                            <TabsList>
                                <TabsTrigger value="male">Male</TabsTrigger>
                                <TabsTrigger value="female">Female</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div>
                        <Label>Goal</Label>
                        <Tabs value={goal} onValueChange={onGoalChange}>
                            <TabsList>
                                <TabsTrigger value="lose">Lose</TabsTrigger>
                                <TabsTrigger value="maintain">Maintain</TabsTrigger>
                                <TabsTrigger value="gain">Gain</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div>
                        <Label>I am currently {age} years old</Label>
                        <Slider value={[age]} max={100} step={1} onValueChange={e => setAge(e[0])} />
                    </div>
                    {system === "imperial" ? (
                        <>
                            <div>
                                <Label>My Height: {imperialHeight} in</Label>
                                <Slider value={[imperialHeight]} max={100} step={1} onValueChange={e => setImperialHeight(e[0])} />
                            </div>
                            <div>
                                <Label>My Current Weight: {imperialWeight} lbs</Label>
                                <Slider value={[imperialWeight]} max={500} step={1} onValueChange={e => setImperialWeight(e[0])} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label>My Height: {metricHeight} cm</Label>
                                <Slider value={[metricHeight]} max={250} step={1} onValueChange={e => setMetricHeight(e[0])} />
                            </div>
                            <div>
                                <Label>My Current Weight: {metricWeight} kg</Label>
                                <Slider value={[metricWeight]} max={230} step={1} onValueChange={e => setMetricWeight(e[0])} />
                            </div>
                        </>
                    )}
                    <div>
                        <Label>My Activity Level</Label>
                        <Tabs value={activityLevel} onValueChange={onActivityLevelChange}>
                            <TabsList>
                                <TabsTrigger value="sedentary">Sendentary</TabsTrigger>
                                <TabsTrigger value="moderate">Moderate</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div>
                        <Label>Protein Target</Label>
                        <Tabs value={protein} onValueChange={onProteinChange}>
                            <TabsList>
                                <TabsTrigger value="low">Low</TabsTrigger>
                                <TabsTrigger value="medium">Medium</TabsTrigger>
                                <TabsTrigger value="high">High</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </form>
            </div>
            <div className="bg-gray-200 p-8 rounded-lg w-full">
                <H3>Results</H3>
                <div className="p-4">
                    <div className="flex flex-col gap-4">
                        <StatCard label="Resting Energy Expenditure" value={Math.round(ree() * 100) / 100} unit="kcal" />
                        <StatCard label="Total Daily Energy Expenditure" value={Math.round(tdee() * 100) / 100} unit="kcal" />
                    </div>
                </div>
            </div>
        </div>
    );
};
