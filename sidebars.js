// sidebars.js
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure.
  // We're overriding that with a single, manually defined sidebar.
  docsSidebar: [
    // This first item is your homepage. It corresponds to `docs/index.md`.
    'index',

    // The rest of your MOC structure follows.
    {
      type: 'category',
      label: 'Basic Syntax',
      items: [
        'casing-conventions',
        {
          type: 'category',
          label: 'Variables and Constants',
          items: ['variables', 'constants'],
        },
        'the-assignment-operator',
        'comments',
        'keywords',
        'natural-language-descriptions',
        'natural-language-instructions',
        'getting-user-input',
        'notifying-the-user',
        'indentation',
        {
          type: 'category',
          label: 'Comparison Operators',
          items: ['equality-inequality-operators', 'relational-operators'],
        },
        'type-aliases',
      ],
    },
    {
      type: 'category',
      label: 'Basic Data Types',
      link: {
        type: 'doc',
        id: 'basic-data-types',
      },
      items: [
        'object-the-universal-base-type',
        {
          type: 'category',
          label: 'Boolean Basic Type',
          items: ['boolean-logical-operators', 'boolean-logical-expressions'],
        },
        {
          type: 'category',
          label: 'Numeric Basic Types',
          items: ['real-basic-type', 'integer-basic-type', 'complex-basic-type'],
        },
        'bits-basic-type',
        'char-basic-type',
        'fspath-basic-type',
        'date-and-time-basic-types',
        'iterator-basic-type',
        'file-basic-type',
        'function-basic-type',
      ],
    },
    {
      type: 'category',
      label: 'The Flow of Execution',
      items: ['if-then', 'if-then-else', 'match', 'for-each', 'while-do', 'do-while'],
    },
    {
      type: 'category',
      label: 'Functions',
      items: [
        'function-parameters',
        'return-value-in-functions',
        {
          type: 'category',
          label: 'Function Invocation',
          items: [
            'function-invocation-using-positional-arguments',
            'function-invocation-using-named-arguments',
            'function-invocation-using-both-positional-and-named-arguments',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Iteration',
      items: [
        'iterator-basic-type',
        'iiterable-interface',
        {
          type: 'category',
          label: 'Integer Streams',
          items: ['intervals-boundary-defined-integer-streams', 'counts-count-defined-integer-streams'],
        },
        'stream-functions',
      ],
    },
    {
      type: 'category',
      label: 'Intermediate Syntax',
      items: [
        'error-handling',
        {
          type: 'category',
          label: 'Operators',
          items: ['minimum-and-maximum'],
        },
        {
          type: 'category',
          label: 'Type Objects',
          items: ['obtaining-type-objects', 'type-compatibility-and-checking'],
        },
        {
          type: 'category',
          label: 'Interfacing with External Entities',
          items: [
            'declaring-conceptual-entities',
            'importing-concrete-external-entities',
            'comparing-concept-and-import',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Data Structures',
      items: [
        {
          type: 'category',
          label: 'Data Structure Categories Explained',
          items: ['elements-topology', 'homogeneity', 'mutability', 'iterability', 'duplicability'],
        },
        'strings', 'tuples', 'lists', 'sortedlists', 'sets', 'stacks', 'queues', 'mappings', 'trees', 'graphs',
      ],
    },
    {
      type: 'category',
      label: 'User-Defined Types',
      items: [
        'records',
        {
          type: 'category',
          label: 'Classes',
          items: ['attributes-in-classes', 'methods-in-classes', 'operators-in-classes'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Object-Oriented Concepts',
      items: ['encapsulation'],
    },
    {
      type: 'category',
      label: 'Interfaces',
      items: ['iequatable-interface', 'icomparable-interface', 'icontainer-interface', 'indexables'],
    },
    // Appendices are top-level items
    'appendix-1-unicode-characters',
    'appendix-2-naming-conventions',
    'pending-revisions',
  ],
};

module.exports = sidebars;