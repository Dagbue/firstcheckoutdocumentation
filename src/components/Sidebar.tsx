<button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full group flex items-start px-3 py-2 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isChildActive(item.children)
                          ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-4 border-bank-blue'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm sm:text-base">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">{item.description}</div>
                      </div>
                      <ChevronRight className={`ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${
                        expandedItems.includes(item.id) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="mt-2 ml-6 sm:ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className={`w-full group flex items-start px-2 sm:px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                              isActive(child.path)
                                ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-2 border-bank-gold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                          >
                            <child.icon className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />
                            <div className="text-left">
                              <div className="font-medium text-xs sm:text-sm">{child.label}</div>
                              <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">{child.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`w-full group flex items-start px-3 py-2 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-4 border-bank-blue'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm sm:text-base">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">{item.description}</div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <div className="mb-2">FirstChekout Documentation</div>
              <div className="text-bank-blue">v1.0.0</div>