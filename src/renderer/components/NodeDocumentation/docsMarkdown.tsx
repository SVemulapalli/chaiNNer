import { Code, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { memo } from 'react';
import { Components } from 'react-markdown';
import { useContext } from 'use-context-selector';
import { SchemaId } from '../../../common/common-types';
import { BackendContext } from '../../contexts/BackendContext';
import { SchemaLink } from './SchemaLink';

const getDocsMarkdownComponents = (interactive: boolean): Components => {
    return {
        p: ({ children }) => {
            return (
                <Text
                    my={2}
                    userSelect="text"
                >
                    {children}
                </Text>
            );
        },
        // eslint-disable-next-line react/prop-types
        code: memo(({ inline, className, children, ...props }) => {
            const { schemata } = useContext(BackendContext);

            // const language = /language-([\w-]+)/.exec(className || '')?.[1];
            const text = String(children);

            if (inline && schemata.has(text as SchemaId)) {
                const schema = schemata.get(text as SchemaId);
                if (!interactive) {
                    return <Text as="i">{schema.name}</Text>;
                }
                return <SchemaLink schema={schema} />;
            }

            return (
                <Code
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    className={className}
                >
                    {children}
                </Code>
            );
        }),
    };
};

export const docsMarkdown = ChakraUIRenderer(getDocsMarkdownComponents(true));
export const tooltipDocsMarkdown = ChakraUIRenderer(getDocsMarkdownComponents(false));
