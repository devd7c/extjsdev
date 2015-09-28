Ext.define('D7C.view.ContentPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    split:true,
    margins:'0 5 5 0',
	bodyStyle: {
		'text-shadow': '1px 1px 1px #777',
		'box-shadow': 'inset 0 0 10px #726E6F'
	},
items: [],
	windows: new Ext.util.MixedCollection(),
    dockedItems: [
                        {
                            xtype: 'toolbar',
							option: 'taskbarerp',
                            dock: 'bottom',
                            //enableOverflow:true,
                            //autoScroll:false,
                            layout: { overflowHandler: 'Scroller' },
							hidden:true,
                            items: [
                                
                            ],
							/*afterLayout: function () {
								var me = this;
								me.callParent();
								me.el.on('contextmenu', me.onButtonContextMenu, me);
							},

							
							getQuickStart: function () {
								var me = this, ret = {
									minWidth: 20,
									width: 60,
									items: [],
									enableOverflow: true
								};

								Ext.each(this.quickStart, function (item) {
									ret.items.push({
										tooltip: { text: item.name, align: 'bl-tl' },
										//tooltip: item.name,
										overflowText: item.name,
										iconCls: item.iconCls,
										module: item.module,
										handler: me.onQuickStartClick,
										scope: me
									});
								});

								return ret;
							},

							
							getTrayConfig: function () {
								var ret = {
									width: 80,
									items: this.trayItems
								};
								delete this.trayItems;
								return ret;
							},

							getWindowBarConfig: function () {
								return {
									flex: 1,
									cls: 'ux-desktop-windowbar',
									items: [ '&#160;' ],
									layout: { overflowHandler: 'Scroller' }
								};
							},

							getWindowBtnFromEl: function (el) {
							console.log('entro');
								var c = this.getChildByElement(el);
								return c || null;
							},

							onQuickStartClick: function (btn) {
								var module = this.app.getModule(btn.module),
									window;

								if (module) {
									window = module.createWindow();
									window.show();
								}
							},
							
							onButtonContextMenu: function (e) {
								var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
								if (btn) {
									e.stopEvent();
									me.windowMenu.theWin = btn.win;
									me.windowMenu.showBy(t);
								}
							},*/

							onWindowBtnClick: function (btn) {
								var win = btn.win;
                                //console.log(win);
                                //console.log(Ext.ZIndexManagerbringToFront(win));
								if (win.minimized || win.hidden) {
									win.show();
                                    //win.active=true;
                                    win.minimized=false;
                                    //console.log('1');
								} else if (win.active) {
									if(Ext.WindowManager.getActive().getId()==win.getId()){
                                    win.minimize();
                                    win.active=false;
                                    win.minimized=true;
                                    }
                                    //console.log('2');
								} else {
                                    //console.log(Ext.WindowManager.getActive().getId());
                                    if(Ext.WindowManager.getActive().getId()==win.getId()){
                                        win.minimize();
                                        win.active=false;
                                        win.minimized=true;
                                    }else{
                                        win.toFront();
                                        win.active=true;
                                    }
									//win.toFront();
                                    //console.log(win.isAncestor());
                                    //win.active=true;
                                    //console.log('3');
								}
							},

							addTaskButton: function(win) {
								var config = {
									iconCls: win.iconCls,
									enableToggle: true,
									toggleGroup: 'all',
									width: 140,
									margins: '0 2 0 3',
                                    tooltip:{ text: win.title, align: 'bl-tl' },
									text: Ext.util.Format.ellipsis(win.title, 20),
									listeners: {
										click: this.onWindowBtnClick,
										scope: this
									},
									win: win
								};

								var cmp = this.add(config);
								cmp.toggle(true);
								return cmp;
							},

							removeTaskButton: function (btn) {
								var found, me = this;
								me.items.each(function (item) {
									if (item === btn) {
										found = item;
									}
									return !found;
								});
								if (found) {
									me.remove(found);
								}
								return found;
							},

							setActiveButton: function(btn) {
								if (btn) {
									btn.toggle(true);
								} else {
									this.items.each(function (item) {
										if (item.isButton) {
											item.toggle(false);
										}
									});
								}
							}
                        }
     ],
	 initComponet:function(){
		var me=this;
		me.windows = new Ext.util.MixedCollection();
        this.callParent(arguments);

		
    },
	 //------------------------------------------------------
    // Event handler methods

    onDesktopMenu: function (e) {
        var me = this, menu = me.contextMenu;
        e.stopEvent();
        if (!menu.rendered) {
            menu.on('beforeshow', me.onDesktopMenuBeforeShow, me);
        }
        menu.showAt(e.getXY());
        menu.doConstrain();
    },

    onDesktopMenuBeforeShow: function (menu) {
        var me = this, count = me.windows.getCount();

        menu.items.each(function (item) {
            var min = item.minWindows || 0;
            item.setDisabled(count < min);
        });
    },

    onShortcutItemClick: function (dataView, record) {
        var me = this, module = me.app.getModule(record.data.module),
            win = module && module.createWindow();

        if (win) {
            me.restoreWindow(win);
        }
    },

    onWindowClose: function(win) {
        //console.log('XXX');
		var me = this;
        me.windows.remove(win);
        me.down('toolbar[option=taskbarerp]').removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },
	 //------------------------------------------------------
    // Window context menu handlers

    onWindowMenuBeforeShow: function (menu) {
        var items = menu.items.items, win = menu.theWin;
        items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
        items[1].setDisabled(win.minimized === true); // Minimize
        items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
    },

    onWindowMenuClose: function () {
		//console.log('XXX');
        var me = this, win = me.windowMenu.theWin;

        win.close();
    },

    onWindowMenuHide: function (menu) {
        menu.theWin = null;
    },

    onWindowMenuMaximize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.maximize();
        win.toFront();
    },

    onWindowMenuMinimize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.minimize();
    },

    onWindowMenuRestore: function () {
        var me = this, win = me.windowMenu.theWin;

        me.restoreWindow(win);
    },
	//----------------------------------------------------------
	// Window management methods
	cascadeWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        });
    },
	getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    getWindow: function(id) {
        return this.windows.get(id);
    },

    minimizeWindow: function(win) {
        win.minimized = true;
        win.hide();
    },

    restoreWindow: function (win) {
        if (win.isVisible()) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        return win;
    },

    tileWindows: function() {
        var me = this, availWidth = me.body.getWidth(true);
        var x = me.xTickSize, y = me.yTickSize, nextY = y;

        me.windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                var w = win.el.getWidth();

                // Wrap to next row if we are not at the line start and this Window will
                // go off the end
                if (x > me.xTickSize && x + w > availWidth) {
                    x = me.xTickSize;
                    y = nextY;
                }

                win.setPosition(x, y);
                x += w + me.xTickSize;
                nextY = Math.max(nextY, y + win.el.getHeight() + me.yTickSize);
            }
        });
    },

    updateActiveWindow: function () {
        var me = this, activeWindow = me.getActiveWindow(), last = me.lastActiveWindow;
        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }
		//me.down('toolbar[option=taskbarerp]');
        me.down('toolbar[option=taskbarerp]').setActiveButton(activeWindow && activeWindow.taskButton);
    }
});
