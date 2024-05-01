import { classNames } from "@/shared/lib/classNames/classNames"
import { Icon } from "../Icon/Icon";
import StarIcon from '../../assets/icons/star.svg';
import cls from './StarRating.module.scss';
import { useState } from "react";

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const {
        className,
        size = 30,
        selectedStars = 0,
        onSelect
    } = props;

    const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starCount: number) => () => {
        if(!isSelected){
            setCurrentStarCount(starCount);
        }
    }

    const onLeave = () => {
        if(!isSelected){
            setCurrentStarCount(0);
        }
    }

    const onClick = (starCount: number) => () => {
        if(!isSelected){
            onSelect?.(starCount);
            setCurrentStarCount(starCount);
            setIsSelected(true);
        }
    }

    return (
        <div className={classNames('', {}, [className])}>
            {stars.map(starNumber => (
                <Icon 
                    Svg={StarIcon}
                    className={classNames(cls.starIcon, {[cls.hovered]: currentStarCount >= starNumber, [cls.normal]: currentStarCount < starNumber}, [])}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
}
