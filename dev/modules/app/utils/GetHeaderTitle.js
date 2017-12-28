export default (pathname) => do {
	if (pathname === '/') {'Dashboard'} else
	if (pathname === '/tickets') {'Tickets'} else
	if (pathname.includes('/tickets')) {'Detalle del Ticket'} else
	if (pathname === '/clients') {'Clientes y Organizaciones'} else
	if (pathname === '/clients/new') {'Creación de nuevo cliente'} else
	if (pathname === '/clients/organizations/new') {'Creación de nueva organización'} else
	if (pathname.includes('/clients/organizations/')) {'Detalle y edición de organización'} else
	if (pathname.includes('/clients/')) {'Detalle y edición de cliente'} else
	if (pathname === '/admin/ticketFields') {'Configuraciones del Ticket'} else
	if (pathname === '/admin/agents') {'Agentes, Proveedores y Grupos'} else
	if (pathname === '/admin/agents/new') {'Creación de nuevo agente'} else
	if (pathname === '/admin/agents/suppliers/new') {'Creación de nuevo proveedor'} else
	if (pathname.includes('/admin/agents/suppliers/')) {'Detalle y edición de proveedor'} else
	if (pathname === '/admin/agents/groups/new') {'Creación de nuevo grupo'} else
	if (pathname.includes('/admin/agents/groups/')) {'Detalle y edición de grupo'} else
	if (pathname.includes('/admin/agents/')) {'Detalle y edición de agente'} else
	if (pathname === '/admin/sla') {'Contratos a Nivel de Servicio'} else
	if (pathname === '/admin/sla/new') {'Creación de nueva política SLA'} else
	if (pathname.includes('/admin/sla/')) {'Detalle y edición de política SLA'} else
	if (pathname === '/admin/businessHours') {'Horario operativo de la empresa'} else
	if (pathname === '/admin/doc') {'Documentación interactiva GraphiQL'} else
	if (pathname === '/admin/email') {'Configuracion del Soporte via Email'} else
	if (pathname === '/admin/palette') {'Paleta de Colores'}
}