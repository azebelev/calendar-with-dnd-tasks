import styled, { css } from 'styled-components';
import { TaskLabelEnum } from '../../enums/taskLabelEnum';

interface IProp {
  variant: TaskLabelEnum;
}

export const TaskLabel = styled.div<IProp>`
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 2px;
  height: 6px;
  width: 30px;
  border-radius: 4px;
  background-color: ${({ theme: { palette }, variant }) => {
    switch (variant) {
      case TaskLabelEnum.Approved:
        return palette.green;
      case TaskLabelEnum.Started:
        return palette.teal;
      case TaskLabelEnum.ClarificationRequired:
        return palette.yellow;
      case TaskLabelEnum.TestingRequired:
        return palette.blue.main;
      case TaskLabelEnum.Documentation:
        return palette.blue.light;
      case TaskLabelEnum.Urgent:
      default:
        return palette.orange;
    }
  }};
  cursor: pointer;
  &:hover:after {
    ${({ variant }) => {
      switch (variant) {
        case TaskLabelEnum.Approved:
          return css`
            content: 'Approved';
          `;
        case TaskLabelEnum.Started:
          return css`
            content: 'Started';
          `;
        case TaskLabelEnum.ClarificationRequired:
          return css`
            content: 'Clarification required';
          `;
        case TaskLabelEnum.TestingRequired:
          return css`
            content: 'Testing required';
          `;
        case TaskLabelEnum.Documentation:
          return css`
            content: 'Documentation';
          `;
        case TaskLabelEnum.Urgent:
        default:
          return css`
            content: 'content: Urgent';
          `;
      }
    }};
    position: absolute;
    top: auto;
    left: 50%;
    transform: translate(-50%, -30px);
    background-color: ${({ theme }) => theme.palette.common.black};
    color: ${({ theme }) => theme.palette.grey.light2};
    padding: 6px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0.9;
    z-index: 100;
    line-height: 12px;
    white-space: nowrap;
  }
`;
