var SPEC_JSON = {
  'selection_pattern':
      '%(source_context_list)s.%(delivery_type)s/%(delivery_value)s/%(subresource)s/%(origin)s.%(redirection)s.%(source_scheme)s',
  'test_file_path_pattern':
      'gen/%(source_context_list)s.%(delivery_type)s/%(delivery_value)s/%(subresource)s/%(origin)s.%(redirection)s.%(source_scheme)s.html',
  'test_description_template':
      'Mixed-Content: Expects %(expectation)s for %(subresource)s to %(origin)s origin and %(redirection)s redirection from %(source_scheme)s context.',
  'test_page_title_template': 'Mixed-Content: %(title)s',
  'specification': [
    {
      'name': 'optionally-blockable',
      'title': 'Optionally-blockable content',
      'description': 'Test behavior of optionally-blockable content',
      'specification_url':
          'http://www.w3.org/TR/mixed-content/#category-optionally-blockable',
      'test_expansion': [
        {
          'name': 'opt-in-blocks',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': 'opt-in',
          'redirection': '*',
          'subresource': {'blockable': [], 'optionally-blockable': '*'},
          'origin': ['cross-http', 'same-http'],
          'expectation': 'blocked'
        },
        {
          'name': 'no-opt-in-allows',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': null,
          'redirection': '*',
          'subresource': {'blockable': [], 'optionally-blockable': '*'},
          'origin': ['cross-http', 'same-http'],
          'expectation': 'allowed'
        }
      ]
    },
    {
      'name': 'blockable',
      'title': 'Blockable content',
      'description': 'Test behavior of blockable content.',
      'specification_url':
          'http://www.w3.org/TR/mixed-content/#category-blockable',
      'test_expansion': [
        {
          'name': 'opt-in-blocks',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': 'opt-in',
          'redirection': '*',
          'subresource': {'blockable': '*', 'optionally-blockable': []},
          'origin': ['cross-http', 'same-http'],
          'expectation': 'blocked'
        },
        {
          'name': 'no-opt-in-blocks',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': null,
          'redirection': '*',
          'subresource': {'blockable': '*', 'optionally-blockable': []},
          'origin': ['cross-http', 'same-http'],
          'expectation': 'blocked'
        },
        {
          'name': 'ws-downgrade-blocks',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': '*',
          'redirection': '*',
          'subresource': {'blockable': 'websocket', 'optionally-blockable': []},
          'origin': ['cross-ws', 'same-ws'],
          'expectation': 'blocked'
        }
      ]
    },
    {
      'name': 'allowed',
      'title': 'Allowed content',
      'description': 'Test behavior of allowed content.',
      'specification_url': 'http://www.w3.org/TR/mixed-content/',
      'test_expansion': [
        {
          'name': 'allowed',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': '*',
          'redirection': ['no-redirect', 'keep-scheme'],
          'subresource': {'blockable': '*', 'optionally-blockable': '*'},
          'origin': ['same-https'],
          'expectation': 'allowed'
        },
        {
          'name': 'websocket-allowed',
          'expansion': 'default',
          'source_scheme': 'https',
          'source_context_list': '*',
          'delivery_type': '*',
          'delivery_value': '*',
          'redirection': ['no-redirect', 'keep-scheme'],
          'subresource': {'blockable': 'websocket', 'optionally-blockable': []},
          'origin': ['same-wss'],
          'expectation': 'allowed'
        }
      ]
    }
  ],
  'delivery_key': 'mixedContent',
  'excluded_tests': [
    {
      'name': 'Skip-redundant-no-opt-in',
      'expansion': '*',
      'source_scheme': '*',
      'source_context_list': '*',
      'delivery_type': 'http-rp',
      'delivery_value': null,
      'redirection': '*',
      'subresource': {'blockable': '*', 'optionally-blockable': '*'},
      'origin': '*',
      'expectation': '*'
    },
    {
      'name': 'Redundant-subresources',
      'expansion': '*',
      'source_scheme': '*',
      'source_context_list': '*',
      'delivery_type': '*',
      'delivery_value': '*',
      'redirection': '*',
      'subresource': {'blockable': ['a-tag'], 'optionally-blockable': []},
      'origin': '*',
      'expectation': '*'
    },
    {
      'name': 'Skip-origins-not-applicable-to-websockets',
      'expansion': '*',
      'source_scheme': '*',
      'source_context_list': '*',
      'delivery_type': '*',
      'delivery_value': '*',
      'redirection': '*',
      'subresource': {'blockable': ['websocket'], 'optionally-blockable': []},
      'origin': ['same-https', 'same-http', 'cross-https', 'cross-http'],
      'expectation': '*'
    },
    {
      'name': 'Skip-redundant-for-opt-in-method',
      'expansion': '*',
      'source_scheme': '*',
      'source_context_list': '*',
      'delivery_type': 'meta',
      'delivery_value': 'opt-in',
      'redirection': ['keep-scheme', 'swap-scheme'],
      'subresource': {'blockable': '*', 'optionally-blockable': '*'},
      'origin': '*',
      'expectation': '*'
    }
  ],
  'source_context_schema': {
    'supported_delivery_type': {
      'top': ['http-rp', 'meta'],
      'iframe': ['http-rp', 'meta'],
      'iframe-blank': ['meta'],
      'srcdoc': ['meta'],
      'worker-classic': ['http-rp'],
      'worker-module': ['http-rp'],
      'worker-classic-data': [],
      'worker-module-data': []
    },
    'supported_subresource': {
      'top': '*',
      'iframe': '*',
      'iframe-blank': '*',
      'srcdoc': '*',
      'worker-classic': ['xhr', 'fetch', 'websocket'],
      'worker-module': ['xhr', 'fetch', 'websocket'],
      'worker-classic-data': ['xhr', 'fetch', 'websocket'],
      'worker-module-data': ['xhr', 'fetch', 'websocket']
    }
  },
  'subresource_schema': {
    'supported_delivery_type': {
      'script-tag': [],
      'link-css-tag': [],
      'xhr': [],
      'worker-classic': [],
      'worker-module': [],
      'worker-import-data': [],
      'sharedworker-classic': [],
      'sharedworker-module': [],
      'sharedworker-import-data': [],
      'worklet-animation': [],
      'worklet-audio': [],
      'worklet-layout': [],
      'worklet-paint': [],
      'worklet-animation-import-data': [],
      'worklet-audio-import-data': [],
      'worklet-layout-import-data': [],
      'worklet-paint-import-data': [],
      'fetch': [],
      'a-tag': [],
      'object-tag': [],
      'picture-tag': [],
      'websocket': [],
      'link-prefetch-tag': [],
      'beacon': [],
      'img-tag': [],
      'audio-tag': [],
      'video-tag': []
    }
  },
  'source_context_list_schema': {
    'top': {
      'description': 'Policy set by the top-level Document',
      'sourceContextList':
          [{'sourceContextType': 'top', 'policyDeliveries': ['policy']}],
      'subresourcePolicyDeliveries': []
    },
    'worker-classic-data': {
      'sourceContextList': [
        {'sourceContextType': 'top', 'policyDeliveries': ['policy']},
        {'sourceContextType': 'worker-classic-data', 'policyDeliveries': []}
      ],
      'subresourcePolicyDeliveries': []
    },
    'worker-module-data': {
      'sourceContextList': [
        {'sourceContextType': 'top', 'policyDeliveries': ['policy']},
        {'sourceContextType': 'worker-module-data', 'policyDeliveries': []}
      ],
      'subresourcePolicyDeliveries': []
    }
  },
  'test_expansion_schema': {
    'expansion': ['default', 'override'],
    'source_scheme': ['http', 'https'],
    'delivery_type': ['http-rp', 'meta'],
    'delivery_value': [null, 'opt-in'],
    'source_context_list': ['top', 'worker-classic-data', 'worker-module-data'],
    'redirection': ['no-redirect', 'keep-scheme', 'swap-scheme'],
    'origin': [
      'same-https', 'same-http', 'cross-https', 'cross-http', 'same-wss',
      'same-ws', 'cross-wss', 'cross-ws'
    ],
    'subresource': {
      'blockable': [
        'script-tag',
        'link-css-tag',
        'xhr',
        'worker-classic',
        'worker-module',
        'worker-import-data',
        'sharedworker-classic',
        'sharedworker-module',
        'sharedworker-import-data',
        'worklet-animation',
        'worklet-audio',
        'worklet-layout',
        'worklet-paint',
        'worklet-animation-import-data',
        'worklet-audio-import-data',
        'worklet-layout-import-data',
        'worklet-paint-import-data',
        'fetch',
        'a-tag',
        'object-tag',
        'picture-tag',
        'websocket',
        'link-prefetch-tag',
        'beacon'
      ],
      'optionally-blockable': ['img-tag', 'audio-tag', 'video-tag']
    },
    'expectation': ['allowed', 'blocked']
  }
};
